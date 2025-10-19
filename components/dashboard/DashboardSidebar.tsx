import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  Users,
  AlertTriangle,
  Bookmark,
  BarChart3,
  PieChart,
  Activity,
  Zap
} from 'lucide-react'
import { useDashboard } from '@/contexts/DashboardContext'

export default function DashboardSidebar() {
  const { state, toggleSidebar } = useDashboard()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['quick-actions', 'data-sources'])
  )

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(section)) {
        newSet.delete(section)
      } else {
        newSet.add(section)
      }
      return newSet
    })
  }

  const quickActions = [
    { id: 'trends', label: 'Trend Analysis', icon: TrendingUp, color: 'text-blue-500' },
    { id: 'audience', label: 'Audience Insights', icon: Users, color: 'text-green-500' },
    { id: 'competitors', label: 'Competitor Analysis', icon: BarChart3, color: 'text-purple-500' },
    { id: 'sentiment', label: 'Sentiment Analysis', icon: PieChart, color: 'text-orange-500' },
  ]

  const dataSources = [
    { id: 'facebook', name: 'Facebook', status: 'connected', color: 'bg-blue-500' },
    { id: 'tiktok', name: 'TikTok', status: 'connected', color: 'bg-black' },
    { id: 'youtube', name: 'YouTube', status: 'connected', color: 'bg-red-500' },
    { id: 'instagram', name: 'Instagram', status: 'disconnected', color: 'bg-pink-500' },
  ]

  const recentAlerts = [
    { id: 1, type: 'negative', message: 'Sentiment drop detected', time: '2m ago' },
    { id: 2, type: 'trending', message: 'New trending topic', time: '5m ago' },
    { id: 3, type: 'competitor', message: 'Competitor activity spike', time: '10m ago' },
  ]

  const savedViews = [
    { id: 1, name: 'Daily Overview', type: 'dashboard' },
    { id: 2, name: 'Weekly Report', type: 'report' },
    { id: 3, name: 'Competitor Watch', type: 'dashboard' },
  ]

  return (
    <motion.div
      initial={{ width: 280 }}
      animate={{ width: state.sidebarCollapsed ? 60 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-full border-r border-border bg-card/50 flex flex-col"
    >
      <AnimatePresence mode="wait">
        {state.sidebarCollapsed ? (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center pt-4 space-y-4"
          >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleSidebar}
                className="p-2 rounded-md hover:bg-accent transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            
            {quickActions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-md hover:bg-accent transition-colors"
                title={action.label}
              >
                <action.icon className={`h-5 w-5 ${action.color}`} />
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-sm font-semibold">Dashboard</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleSidebar}
                className="p-1 rounded-md hover:bg-accent transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </motion.button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Quick Actions */}
              <div>
                <motion.button
                  onClick={() => toggleSection('quick-actions')}
                  className="flex items-center justify-between w-full p-2 rounded-md hover:bg-accent/50 transition-colors group"
                >
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Quick Actions
                  </span>
                  <motion.div
                    animate={{ rotate: expandedSections.has('quick-actions') ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronLeft className="h-3.5 w-3.5 text-muted-foreground" />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {expandedSections.has('quick-actions') && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 space-y-2"
                    >
                      {quickActions.map((action, index) => (
                        <motion.button
                          key={action.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-accent transition-colors text-left"
                        >
                          <action.icon className={`h-4 w-4 ${action.color}`} />
                          <span className="text-sm">{action.label}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Data Sources */}
              <div>
                <motion.button
                  onClick={() => toggleSection('data-sources')}
                  className="flex items-center justify-between w-full p-2 rounded-md hover:bg-accent/50 transition-colors group"
                >
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Data Sources
                  </span>
                  <motion.div
                    animate={{ rotate: expandedSections.has('data-sources') ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronLeft className="h-3.5 w-3.5 text-muted-foreground" />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {expandedSections.has('data-sources') && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 space-y-2"
                    >
                      {dataSources.map((source, index) => (
                        <motion.div
                          key={source.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors"
                        >
                          <div className={`w-3 h-3 rounded-full ${source.color}`} />
                          <span className="text-sm flex-1">{source.name}</span>
                          <div className={`w-2 h-2 rounded-full ${
                            source.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
                          }`} />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Recent Alerts */}
              <div>
                <div className="flex items-center gap-2 p-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Recent Alerts
                  </span>
                </div>
                
                <div className="mt-2 space-y-2">
                  {recentAlerts.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                    >
                      <div className="text-xs font-medium">{alert.message}</div>
                      <div className="text-xs text-muted-foreground">{alert.time}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Saved Views */}
              <div>
                <div className="flex items-center gap-2 p-2">
                  <Bookmark className="h-4 w-4 text-blue-500" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Saved Views
                  </span>
                </div>
                
                <div className="mt-2 space-y-2">
                  {savedViews.map((view, index) => (
                    <motion.button
                      key={view.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-accent transition-colors text-left"
                    >
                      <Activity className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{view.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
