import React from 'react'
import { motion } from 'framer-motion'
import { Wifi, WifiOff } from 'lucide-react'
import { useTranslation } from 'next-i18next'
import { useDashboard } from '@/contexts/DashboardContext'

export default function RealTimeIndicator() {
  const { t } = useTranslation('common')
  const { state, toggleRealTime } = useDashboard()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleRealTime}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
        state.isRealTime
          ? 'bg-green-100 text-green-700 border border-green-200'
          : 'bg-gray-100 text-gray-700 border border-gray-200'
      }`}
    >
      {state.isRealTime ? (
        <>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-green-500 rounded-full"
          />
          <Wifi className="h-3 w-3" />
          <span>{t('dashboard.realTime')}</span>
        </>
      ) : (
        <>
          <div className="w-2 h-2 bg-gray-400 rounded-full" />
          <WifiOff className="h-3 w-3" />
          <span>Offline</span>
        </>
      )}
    </motion.button>
  )
}