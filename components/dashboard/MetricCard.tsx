import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { useTranslation } from 'next-i18next'

interface MetricCardProps {
  title: string
  value: string
  delta: string
  trend: 'up' | 'down' | 'neutral'
  animation: 'counter' | 'gauge' | 'progress'
  color: string
}

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'neutral' }) => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="h-4 w-4 text-green-600" />
    case 'down':
      return <TrendingDown className="h-4 w-4 text-red-600" />
    default:
      return <Minus className="h-4 w-4 text-gray-600" />
  }
}

const CounterAnimation = ({ value, color }: { value: string; color: string }) => {
  const numericValue = parseFloat(value.replace(/[^\d.-]/g, ''))
  const suffix = value.replace(/[\d.-]/g, '')
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-2xl font-bold mb-1"
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          delay: 0.3,
          duration: 0.8,
          ease: "easeOut"
        }}
        className={color}
      >
        {numericValue.toLocaleString()}
      </motion.span>
      {suffix && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground"
        >
          {suffix}
        </motion.span>
      )}
    </motion.div>
  )
}

const GaugeAnimation = ({ value, color }: { value: string; color: string }) => {
  const numericValue = parseFloat(value.replace(/[^\d.-]/g, ''))
  const percentage = Math.min(Math.abs(numericValue) * 100, 100)
  
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold mb-1"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.3,
            duration: 0.8,
            ease: "easeOut"
          }}
          className={color}
        >
          {value}
        </motion.span>
      </motion.div>
      
      {/* Gauge visualization */}
      <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            delay: 0.5,
            duration: 1.2,
            ease: "easeOut"
          }}
          className={`h-full rounded-full ${
            numericValue >= 0 ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
      </div>
    </div>
  )
}

const ProgressAnimation = ({ value, color }: { value: string; color: string }) => {
  const numericValue = parseFloat(value.replace(/[^\d.-]/g, ''))
  
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold mb-1"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.3,
            duration: 0.8,
            ease: "easeOut"
          }}
          className={color}
        >
          {value}
        </motion.span>
      </motion.div>
      
      {/* Progress bar */}
      <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${numericValue}%` }}
          transition={{ 
            delay: 0.5,
            duration: 1.5,
            ease: "easeOut"
          }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
        />
      </div>
    </div>
  )
}

export default function MetricCard({ 
  title, 
  value, 
  delta, 
  trend, 
  animation, 
  color 
}: MetricCardProps) {
  const renderValue = () => {
    switch (animation) {
      case 'counter':
        return <CounterAnimation value={value} color={color} />
      case 'gauge':
        return <GaugeAnimation value={value} color={color} />
      case 'progress':
        return <ProgressAnimation value={value} color={color} />
      default:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold mb-1"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.3,
                duration: 0.8,
                ease: "easeOut"
              }}
              className={color}
            >
              {value}
            </motion.span>
          </motion.div>
        )
    }
  }

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      whileTap={{ scale: 0.98 }}
      className="bg-card border border-border rounded-lg p-6 cursor-pointer hover:border-primary/20 transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-2">
        <motion.h4
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm font-medium text-muted-foreground"
        >
          {title}
        </motion.h4>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <TrendIcon trend={trend} />
        </motion.div>
      </div>
      
      {renderValue()}
      
      <motion.div
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={`text-sm flex items-center gap-1 ${
          trend === 'up' ? 'text-green-600' : 
          trend === 'down' ? 'text-red-600' : 
          'text-gray-600'
        }`}
      >
        <TrendIcon trend={trend} />
        <span>{delta}</span>
      </motion.div>
    </motion.div>
  )
}
