import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, ChevronDown } from 'lucide-react'
import { useTranslation } from 'next-i18next'

interface TimeRangeSelectorProps {
  selectedRange: string
  onRangeChange: (range: string) => void
}

export default function TimeRangeSelector({ selectedRange, onRangeChange }: TimeRangeSelectorProps) {
  const { t } = useTranslation('common')

  const ranges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
  ]

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-3 py-2 bg-muted/50 hover:bg-muted rounded-lg border border-border transition-colors"
      >
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">
          {ranges.find(r => r.value === selectedRange)?.label || 'Select Range'}
        </span>
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </motion.button>
    </div>
  )
}