import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { nodesConfig } from '@/config/nodes.config'
import NodeItem from './NodeItem'
import { motion, AnimatePresence } from 'framer-motion'

export default function NodesSidebar() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="relative h-full">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="sidebar-open"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full border-r border-border bg-card/50"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <h3 className="text-sm font-semibold">Nodes</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-md p-1 hover:bg-accent transition-colors"
                  aria-label="Collapse sidebar"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-4 gap-3">
                  {nodesConfig.map((node) => (
                    <NodeItem key={node.id} node={node} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="sidebar-closed"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 48, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full border-r border-border bg-card/50"
          >
            <div className="flex h-full flex-col items-center pt-3">
              <button
                onClick={() => setIsOpen(true)}
                className="rounded-md p-1 hover:bg-accent transition-colors"
                aria-label="Expand sidebar"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
