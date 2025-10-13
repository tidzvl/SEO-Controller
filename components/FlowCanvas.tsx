import { useCallback, useRef, useState, DragEvent, useMemo } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  NodeTypes,
  ConnectionLineType,
  MarkerType,
  Node,
} from 'reactflow'
import CustomNode from './CustomNode'
import NodeConfigModal from './NodeConfigModal'
import CanvasControls from './CanvasControls'
import { NodeConfig, nodesConfig } from '@/config/nodes.config'
import { useTheme } from 'next-themes'

let id = 0
const getId = () => `node_${id++}`

function FlowCanvas() {
  const nodeTypes: NodeTypes = useMemo(() => ({ custom: CustomNode }), [])
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)
  const [configModalOpen, setConfigModalOpen] = useState(false)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const { theme } = useTheme()

  const handleNodeDoubleClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
    setConfigModalOpen(true)
  }, [])

  const handleSaveNodeConfig = useCallback((data: {
    displayName: string
    inputValues: Record<string, string>
    requirementValues: Record<string, string>
  }) => {
    if (!selectedNode) return

    const updatedNodeData = {
      ...selectedNode.data,
      displayName: data.displayName,
      inputValues: data.inputValues,
      requirementValues: data.requirementValues,
    }

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: updatedNodeData,
          }
        }
        return node
      })
    )

    setSelectedNode({
      ...selectedNode,
      data: updatedNodeData,
    })
  }, [selectedNode, setNodes])

  const handleRun = useCallback(() => {
    console.log('Running workflow...', { nodes, edges })
  }, [nodes, edges])

  const handlePause = useCallback(() => {
    console.log('Pausing workflow...')
  }, [])

  const handleSave = useCallback(() => {
    const diagramData = {
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle
      }))
    }
    
    const dataStr = JSON.stringify(diagramData, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `diagram-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }, [nodes, edges])

  const handleClear = useCallback(() => {
    if (confirm('Are you sure you want to clear all nodes and connections?')) {
      setNodes([])
      setEdges([])
    }
  }, [setNodes, setEdges])

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'default',
            animated: true,
            style: { stroke: '#6366f1', strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#6366f1',
            },
          },
          eds
        )
      )
    },
    [setEdges]
  )

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault()

      if (!reactFlowWrapper.current || !reactFlowInstance) return

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const nodeId = event.dataTransfer.getData('application/reactflow')

      if (!nodeId) return

      const nodeConfig = nodesConfig.find(n => n.id === nodeId)
      if (!nodeConfig) return

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      const newNode = {
        id: getId(),
        type: 'custom',
        position,
        data: { 
          config: nodeConfig,
          displayName: nodeConfig.name,
          inputValues: {},
          requirementValues: {}
        },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes]
  )

  return (
    <>
      <div className="w-full h-full relative" ref={reactFlowWrapper}>
        <CanvasControls
          onRun={handleRun}
          onPause={handlePause}
          onSave={handleSave}
          onClear={handleClear}
        />
        
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={handleNodeDoubleClick}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          connectionLineType={ConnectionLineType.Bezier}
          fitView
          className="bg-background"
        >
          <Controls className="!bg-card !border-border" />
          <Background
            variant={BackgroundVariant.Dots}
            gap={16}
            size={1}
            color={theme === 'dark' ? '#374151' : '#d1d5db'}
          />
        </ReactFlow>
      </div>

      <NodeConfigModal
        open={configModalOpen}
        onOpenChange={setConfigModalOpen}
        nodeData={selectedNode?.data ? {
          id: selectedNode.id,
          config: selectedNode.data.config,
          displayName: selectedNode.data.displayName,
          inputValues: selectedNode.data.inputValues,
          requirementValues: selectedNode.data.requirementValues
        } : null}
        onSave={handleSaveNodeConfig}
      />
    </>
  )
}

export default function FlowCanvasWrapper() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  )
}
