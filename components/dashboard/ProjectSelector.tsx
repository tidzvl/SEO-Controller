import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, FolderOpen } from 'lucide-react'
import { useTranslation } from 'next-i18next'
import { useDashboard } from '@/contexts/DashboardContext'

export default function ProjectSelector() {
  const { t } = useTranslation('common')
  const { state, setProject } = useDashboard()

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-3 py-2 bg-muted/50 hover:bg-muted rounded-lg border border-border transition-colors"
      >
        <FolderOpen className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">
          {state.selectedProject?.name || 'Select Project'}
        </span>
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </motion.button>
    </div>
  )
}