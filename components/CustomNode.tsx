import { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { NodeConfig } from '@/config/nodes.config'

interface CustomNodeData {
  config: NodeConfig
}

function CustomNode({ data }: NodeProps<CustomNodeData>) {
  const { config } = data
  const Icon = config.icon

  const getShapeClass = () => {
    switch (config.shape) {
      case 0:
        return 'rounded-lg'
      case 1:
        return 'rounded-2xl'
      case 2:
        return 'rounded-full'
      default:
        return 'rounded-lg'
    }
  }

  const getNodeSize = () => {
    switch (config.shape) {
      case 0:
        return 'w-32 h-32'
      case 1:
        return 'w-40 h-28'
      case 2:
        return 'w-32 h-32'
      default:
        return 'w-32 h-32'
    }
  }

  const inputHandles = config.links.filter(link => link.type === 'input')
  const requirementHandles = config.links.filter(link => link.type === 'requirement')
  const outputHandles = config.links.filter(link => link.type === 'output')

  return (
    <div className="relative">
      <div
        className={`${getNodeSize()} ${getShapeClass()} bg-card border-2 shadow-lg flex flex-col items-center justify-center p-4 transition-all hover:shadow-xl`}
        style={{ borderColor: config.theme_color }}
      >
        <Icon className="text-4xl mb-2" style={{ color: config.theme_color }} />
        <p className="text-xs font-semibold text-center">{config.name}</p>
      </div>

      {inputHandles.map((handle, index) => {
        const totalHandles = inputHandles.length
        const offset = totalHandles > 1 
          ? ((index + 1) / (totalHandles + 1)) * 100 
          : 50
        
        return (
          <div 
            key={`input-${index}`} 
            className="absolute left-0 -translate-x-2 flex items-center"
            style={{ top: `${offset}%`, transform: 'translateY(-50%) translateX(-0.5rem)' }}
          >
            <span className="text-[10px] font-medium text-muted-foreground mr-2 whitespace-nowrap bg-background/80 px-1.5 py-0.5 rounded">
              {handle.label}
            </span>
            <Handle
              type="target"
              position={Position.Left}
              id={`input-${index}`}
              className="!w-3 !h-3 !border-2"
              style={{ 
                background: config.theme_color,
                borderColor: config.theme_color,
                position: 'relative',
                left: 0,
                top: 0,
                transform: 'none'
              }}
            />
          </div>
        )
      })}

      {requirementHandles.map((handle, index) => {
        const totalHandles = requirementHandles.length
        const offset = totalHandles > 1 
          ? ((index + 1) / (totalHandles + 1)) * 100 
          : 50
        
        return (
          <div 
            key={`requirement-${index}`} 
            className="absolute bottom-0 translate-y-2 flex flex-col items-center"
            style={{ left: `${offset}%`, transform: 'translateX(-50%) translateY(0.5rem)' }}
          >
            <Handle
              type="target"
              position={Position.Bottom}
              id={`requirement-${index}`}
              className="!w-3 !h-3 !border-2"
              style={{ 
                background: config.theme_color,
                borderColor: config.theme_color,
                position: 'relative',
                left: 0,
                top: 0,
                transform: 'none'
              }}
            />
            <span className="text-[10px] font-medium text-muted-foreground mt-1 whitespace-nowrap bg-background/80 px-1.5 py-0.5 rounded">
              {handle.label}
            </span>
          </div>
        )
      })}

      {outputHandles.map((handle, index) => {
        const totalHandles = outputHandles.length
        const offset = totalHandles > 1 
          ? ((index + 1) / (totalHandles + 1)) * 100 
          : 50
        
        return (
          <div 
            key={`output-${index}`} 
            className="absolute right-0 translate-x-2 flex items-center"
            style={{ top: `${offset}%`, transform: 'translateY(-50%) translateX(0.5rem)' }}
          >
            <Handle
              type="source"
              position={Position.Right}
              id={`output-${index}`}
              className="!w-3 !h-3 !border-2"
              style={{ 
                background: config.theme_color,
                borderColor: config.theme_color,
                position: 'relative',
                left: 0,
                top: 0,
                transform: 'none'
              }}
            />
            <span className="text-[10px] font-medium text-muted-foreground ml-2 whitespace-nowrap bg-background/80 px-1.5 py-0.5 rounded">
              {handle.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default memo(CustomNode)
