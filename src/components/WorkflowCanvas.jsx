import React, { useCallback, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import './WorkflowCanvas.css';
import { nodesConfig, inputNodes } from '../config/nodesConfig';
import { useModalState } from '../contexts/ModalStateContext';
import NodeModal from './modals/NodeModal';

const CustomNode = ({ data }) => {
  const IconComponent = data.iconComponent;
  const links = data.links || [];
  const shape = data.shape !== undefined ? data.shape : 1;
  const category = data.category;
  
  const inputLinks = links.filter(link => link.type === 'input');
  const outputLinks = links.filter(link => link.type === 'output');
  const requirementLinks = links.filter(link => link.type === 'requirement');
  
  const calculatePosition = (index, total) => {
    return ((index + 1) / (total + 1)) * 100;
  };
  
  const getShapeClass = () => {
    if (category === 'input') {
      return 'custom-node-input';
    }
    
    switch(shape) {
      case 0: return 'node-shape-circle';
      case 1: return 'node-shape-square';
      case 2: return 'node-shape-rectangle';
      default: return 'node-shape-square';
    }
  };
  
  return (
    <div className={`custom-node-new ${getShapeClass()}`} style={{ borderColor: data.color }}>
      {inputLinks.map((link, index) => (
        <div key={`input-wrapper-${index}`} className="handle-wrapper handle-wrapper-left" style={{ top: `${calculatePosition(index, inputLinks.length)}%` }}>
          <Handle
            type="target"
            position={Position.Left}
            id={`input-${index}`}
            className="handle-square"
            style={{ background: data.color }}
          />
          <span className="handle-label handle-label-left">{link.label}</span>
        </div>
      ))}
      
      {outputLinks.map((link, index) => (
        <div key={`output-wrapper-${index}`} className="handle-wrapper handle-wrapper-right" style={{ top: `${calculatePosition(index, outputLinks.length)}%` }}>
          <span className="handle-label handle-label-right">{link.label}</span>
          <Handle
            type="source"
            position={Position.Right}
            id={`output-${index}`}
            className="handle-circle"
            style={{ background: data.color }}
          />
        </div>
      ))}
      
      {requirementLinks.map((link, index) => (
        <div key={`requirement-wrapper-${index}`} className="handle-wrapper handle-wrapper-bottom" style={{ left: `${calculatePosition(index, requirementLinks.length)}%` }}>
          <span className="handle-label handle-label-bottom">{link.label}</span>
          <Handle
            type="target"
            position={Position.Bottom}
            id={`requirement-${index}`}
            className="handle-diamond"
            style={{ background: data.color }}
          />
        </div>
      ))}
      
      <div className="node-content-wrapper">
        <div className="node-icon-center">
          {IconComponent && <IconComponent size={40} color={data.color} />}
        </div>
        <div className="node-name">{data.label}</div>
      </div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const WorkflowCanvasInner = forwardRef((props, ref) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { openModal } = useModalState();

  useImperativeHandle(ref, () => ({
    loadWorkflow: (workflow) => {
      setNodes(workflow.nodes || []);
      setEdges(workflow.edges || []);
    }
  }));

  const isValidConnection = useCallback(
    (connection) => {
      const sourceNode = nodes.find(n => n.id === connection.source);
      const targetNode = nodes.find(n => n.id === connection.target);
      
      if (!sourceNode || !targetNode) return false;
      if (!connection.sourceHandle || !connection.targetHandle) return false;
      
      const sourceHandleParts = connection.sourceHandle.split('-');
      const targetHandleParts = connection.targetHandle.split('-');
      
      if (sourceHandleParts.length !== 2 || targetHandleParts.length !== 2) return false;
      
      const sourceHandleType = sourceHandleParts[0];
      const targetHandleType = targetHandleParts[0];
      const sourceHandleIndex = parseInt(sourceHandleParts[1]);
      const targetHandleIndex = parseInt(targetHandleParts[1]);
      
      if (isNaN(sourceHandleIndex) || isNaN(targetHandleIndex)) return false;
      
      const sourceLinks = sourceNode.data.links || [];
      const targetLinks = targetNode.data.links || [];
      
      const sourceLinksByType = sourceLinks.filter(link => link.type === sourceHandleType);
      const targetLinksByType = targetLinks.filter(link => link.type === targetHandleType);
      
      const sourceLink = sourceLinksByType[sourceHandleIndex];
      const targetLink = targetLinksByType[targetHandleIndex];
      
      if (!sourceLink || !targetLink) return false;
      
      const sourceConnections = edges.filter(
        e => e.source === connection.source && e.sourceHandle === connection.sourceHandle
      ).length;
      
      const targetConnections = edges.filter(
        e => e.target === connection.target && e.targetHandle === connection.targetHandle
      ).length;
      
      if (sourceConnections >= sourceLink.max_connect) {
        return false;
      }
      
      if (targetConnections >= targetLink.max_connect) {
        return false;
      }
      
      return true;
    },
    [nodes, edges]
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = event.dataTransfer.getData('application/reactflow');

      if (!data) {
        return;
      }

      const nodeData = JSON.parse(data);
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const allNodes = [...nodesConfig, ...inputNodes];
      const nodeConfig = allNodes.find(n => n.id === nodeData.icon);

      const newNode = {
        id: `${nodeData.type}-${Date.now()}`,
        type: 'custom',
        position,
        className: nodeData.shape === 0 ? 'react-flow__node_circle' : '',
        data: {
          label: nodeData.label,
          icon: nodeData.icon,
          color: nodeData.color,
          shape: nodeData.shape,
          iconComponent: nodeConfig?.icon,
          links: nodeData.links || [],
          category: nodeData.category,
          fields: nodeData.fields || [],
          config: {
            displayName: nodeData.label,
            inputs: {},
            requirements: {},
            values: {}
          }
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeDoubleClick = useCallback(
    (event, node) => {
      openModal(node.id, node.data);
    },
    [openModal]
  );

  const handleModalSave = useCallback(
    (nodeId, updatedConfig) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                label: updatedConfig.displayName,
                config: {
                  ...node.data.config,
                  displayName: updatedConfig.displayName,
                  values: updatedConfig.values
                }
              }
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  const saveWorkflow = useCallback(() => {
    const workflowName = prompt('Nhập tên workflow:');
    if (!workflowName) return;

    const workflow = {
      id: Date.now().toString(),
      name: workflowName,
      nodes: nodes,
      edges: edges,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const savedWorkflows = JSON.parse(localStorage.getItem('workflows') || '[]');
    savedWorkflows.push(workflow);
    localStorage.setItem('workflows', JSON.stringify(savedWorkflows));

    alert(`Đã lưu workflow "${workflowName}" thành công!`);
  }, [nodes, edges]);

  const loadWorkflow = useCallback((workflow) => {
    setNodes(workflow.nodes || []);
    setEdges(workflow.edges || []);
  }, [setNodes, setEdges]);

  const defaultEdgeOptions = {
    type: 'default',
    animated: false,
    style: { 
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }
  };

  return (
    <div className="workflow-canvas" ref={reactFlowWrapper}>
      <div className="workflow-toolbar">
        <button className="save-workflow-btn" onClick={saveWorkflow}>
          💾 Lưu Workflow
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeDoubleClick={onNodeDoubleClick}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        snapToGrid
        snapGrid={[15, 15]}
      >
        <Background color="var(--border-color)" gap={20} />
        <Controls />
        <MiniMap 
          nodeColor={(node) => node.data.color || 'var(--accent-color)'}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
      <NodeModal onSave={handleModalSave} />
    </div>
  );
});

const WorkflowCanvas = forwardRef((props, ref) => {
  return (
    <ReactFlowProvider>
      <WorkflowCanvasInner ref={ref} />
    </ReactFlowProvider>
  );
});

export default WorkflowCanvas;
