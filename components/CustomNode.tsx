import { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { NodeConfig } from '@/config/nodes.config'

interface CustomNodeData {
  config: NodeConfig
}

function CustomNode({ data }: NodeProps<CustomNodeData>) {
  const { config } = data
  
  if (!config || !config.icon) {
    return null
  }
  
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
        return 'w-28 h-28'
      case 1:
        return 'w-36 h-24'
      case 2:
        return 'w-28 h-28'
      default:
        return 'w-28 h-28'
    }
  }

  const inputHandles = config.links.filter(link => link.type === 'input')
  const requirementHandles = config.links.filter(link => link.type === 'requirement')
  const outputHandles = config.links.filter(link => link.type === 'output')

  return (
    <div className="relative">
      <div
        className={`${getNodeSize()} ${getShapeClass()} bg-card border-2 shadow-lg flex flex-col items-center justify-center p-2 transition-all hover:shadow-xl`}
        style={{ borderColor: config.theme_color }}
      >
        <Icon className="text-2xl mb-1" style={{ color: config.theme_color }} />
        <p className="text-[10px] font-semibold text-center">{config.name}</p>
      </div>

      {inputHandles.map((handle, index) => {
        const totalHandles = inputHandles.length
        const offset = totalHandles > 1 
          ? ((index + 1) / (totalHandles + 1)) * 100 
          : 50
        
        return (
          <div 
            key={`input-${index}`} 
            className="absolute flex items-center"
            style={{ left: 0, top: `${offset}%`, transform: 'translateY(-50%)' }}
          >
            <span className="text-[10px] font-medium text-muted-foreground mr-1 whitespace-nowrap bg-background/80 px-1.5 py-0.5 rounded -translate-x-full">
              {handle.label}
            </span>
            <Handle
              type="target"
              position={Position.Left}
              id={`input-${index}`}
              className="!w-3 !h-3 !border-2 !rounded-[2px]"
              style={{ 
                background: config.theme_color,
                borderColor: config.theme_color,
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translate(-50%, -50%)'
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
            className="absolute flex flex-col items-center"
            style={{ left: `${offset}%`, bottom: 0, transform: 'translateX(-50%)' }}
          >
            <Handle
              type="target"
              position={Position.Bottom}
              id={`requirement-${index}`}
              className="!w-3 !h-3 !border-2"
              style={{ 
                background: config.theme_color,
                borderColor: config.theme_color,
                position: 'absolute',
                left: '50%',
                bottom: 0,
                transform: 'translate(-50%, 50%) rotate(45deg)',
                borderRadius: '2px'
              }}
            />
            <span className="text-[10px] font-medium text-muted-foreground whitespace-nowrap bg-background/80 px-1.5 py-0.5 rounded translate-y-full mt-2">
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
            className="absolute flex items-center"
            style={{ right: 0, top: `${offset}%`, transform: 'translateY(-50%)' }}
          >
            <Handle
              type="source"
              position={Position.Right}
              id={`output-${index}`}
              className="!w-4 !h-2 !border-2 !rounded-sm"
              style={{ 
                background: config.theme_color,
                borderColor: config.theme_color,
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translate(50%, -50%)'
              }}
            />
            <span className="text-[10px] font-medium text-muted-foreground ml-1 whitespace-nowrap bg-background/80 px-1.5 py-0.5 rounded translate-x-full">
              {handle.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default memo(CustomNode)
