import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { NodeConfig } from '@/config/nodes.config'

interface NodeConfigModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  nodeData: {
    id: string
    config: NodeConfig
    displayName?: string
    inputValues?: Record<string, string>
    requirementValues?: Record<string, string>
    outputValues?: Record<string, string>
  } | null
  onSave: (data: {
    displayName: string
    inputValues: Record<string, string>
    requirementValues: Record<string, string>
    outputValues: Record<string, string>
  }) => void
}

export default function NodeConfigModal({ open, onOpenChange, nodeData, onSave }: NodeConfigModalProps) {
  const [displayName, setDisplayName] = useState('')
  const [inputValues, setInputValues] = useState<Record<string, string>>({})
  const [requirementValues, setRequirementValues] = useState<Record<string, string>>({})
  const [outputValues, setOutputValues] = useState<Record<string, string>>({})

  useEffect(() => {
    if (nodeData) {
      setDisplayName(nodeData.displayName || nodeData.config.name)
      setInputValues(nodeData.inputValues || {})
      setRequirementValues(nodeData.requirementValues || {})
      setOutputValues(nodeData.outputValues || {})
    }
  }, [nodeData])

  if (!nodeData) return null

  const inputHandles = nodeData.config.links.filter(link => link.type === 'input')
  const requirementHandles = nodeData.config.links.filter(link => link.type === 'requirement')
  const outputHandles = nodeData.config.links.filter(link => link.type === 'output')
  
  const isBasicNode = nodeData.config.group === 'Basic'

  const handleSave = () => {
    onSave({
      displayName,
      inputValues,
      requirementValues,
      outputValues
    })
    onOpenChange(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-lg shadow-xl p-6 w-full max-w-md z-50 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold">
              Configure Node
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-1 hover:bg-accent rounded-md transition-colors">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder={nodeData.config.name}
              />
            </div>

            {inputHandles.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-2">Input Values</h3>
                {inputHandles.map((handle, index) => (
                  <div key={`input-${index}`} className="mb-3">
                    <label className="text-sm font-medium mb-1.5 block">
                      {handle.label}
                    </label>
                    <input
                      type="text"
                      value={inputValues[`input-${index}`] || ''}
                      onChange={(e) => setInputValues({
                        ...inputValues,
                        [`input-${index}`]: e.target.value
                      })}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder={`Enter ${handle.label.toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>
            )}

            {requirementHandles.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-2">Requirements</h3>
                {requirementHandles.map((handle, index) => (
                  <div key={`requirement-${index}`} className="mb-3">
                    <label className="text-sm font-medium mb-1.5 block">
                      {handle.label}
                    </label>
                    {handle.data_type.includes('text') || handle.label.toLowerCase().includes('text') ? (
                      <textarea
                        value={requirementValues[`requirement-${index}`] || ''}
                        onChange={(e) => setRequirementValues({
                          ...requirementValues,
                          [`requirement-${index}`]: e.target.value
                        })}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px]"
                        placeholder={`Enter ${handle.label.toLowerCase()}`}
                      />
                    ) : (
                      <input
                        type="text"
                        value={requirementValues[`requirement-${index}`] || ''}
                        onChange={(e) => setRequirementValues({
                          ...requirementValues,
                          [`requirement-${index}`]: e.target.value
                        })}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder={`Enter ${handle.label.toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {outputHandles.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-2">
                  {isBasicNode ? 'Input Data' : 'Output Data'}
                </h3>
                {outputHandles.map((handle, index) => (
                  <div key={`output-${index}`} className="mb-3">
                    <label className="text-sm font-medium mb-1.5 block">
                      {handle.label}
                    </label>
                    <textarea
                      value={outputValues[`output-${index}`] || ''}
                      onChange={(e) => setOutputValues({
                        ...outputValues,
                        [`output-${index}`]: e.target.value
                      })}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px] font-mono text-sm"
                      placeholder={isBasicNode ? `Enter ${handle.label.toLowerCase()} data...` : 'Output data will appear here...'}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <Dialog.Close asChild>
              <button className="flex-1 px-4 py-2 bg-accent hover:bg-accent/80 rounded-md transition-colors font-medium">
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors font-medium"
            >
              Save
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
