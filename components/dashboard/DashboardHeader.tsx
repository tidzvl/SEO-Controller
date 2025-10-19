import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  Share2, 
  Calendar,
  RefreshCw,
  Settings,
  Bell
} from 'lucide-react'
import { useTranslation } from 'next-i18next'
import RealTimeIndicator from './RealTimeIndicator'
import ProjectSelector from './ProjectSelector'
import TimeRangeSelector from './TimeRangeSelector'
import { useDashboard } from '@/contexts/DashboardContext'

export default function DashboardHeader() {
  const { t } = useTranslation('common')
  const { state, setProject, setTimeRange, toggleRealTime } = useDashboard()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const handleExport = () => {
    // Export functionality
    console.log('Exporting dashboard...')
  }

  const handleShare = () => {
    // Share functionality
    console.log('Sharing dashboard...')
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border"
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section - Brand & Project */}
        <div className="flex items-center gap-4">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
          >
{t('dashboard.title')}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ProjectSelector />
          </motion.div>
        </div>
        
        {/* Right Section - Controls & Status */}
        <div className="flex items-center gap-4">
          {/* Real-time Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <RealTimeIndicator />
          </motion.div>
          
          {/* Time Range Selector */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <TimeRangeSelector 
              selectedRange={state.timeRange}
              onRangeChange={setTimeRange}
            />
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-md hover:bg-accent transition-colors disabled:opacity-50"
              aria-label={t('dashboard.loading')}
            >
              <RefreshCw 
                className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} 
              />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              className="p-2 rounded-md hover:bg-accent transition-colors"
              aria-label={t('dashboard.export')}
            >
              <Download className="h-4 w-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="p-2 rounded-md hover:bg-accent transition-colors"
              aria-label={t('dashboard.share')}
            >
              <Share2 className="h-4 w-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-md hover:bg-accent transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-md hover:bg-accent transition-colors"
              aria-label="Settings"
            >
              <Settings className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
