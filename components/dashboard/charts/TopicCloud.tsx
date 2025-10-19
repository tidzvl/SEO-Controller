import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  Maximize2,
  Hash,
  TrendingUp
} from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { WordCloudController, WordElement } from 'chartjs-chart-wordcloud'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  WordCloudController,
  WordElement
)

interface TopicData {
  text: string
  value: number
  sentiment?: number
  confidence?: number
  trend?: 'rising' | 'falling' | 'stable'
  mentions?: number
  engagement?: number
}

interface TopicCloudProps {
  title: string
  data: TopicData[]
  animation?: 'word-cloud' | 'fade-in'
  interaction?: 'click-filter' | 'hover-only'
}

export default function TopicCloud({ 
  title, 
  data, 
  animation = 'word-cloud',
  interaction = 'click-filter'
}: TopicCloudProps) {
  const chartRef = useRef<ChartJS<'wordCloud', any, string> | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Get color based on sentiment and trend
  const getColor = (sentiment: number = 0, trend: string = 'stable') => {
    if (trend === 'rising') {
      return sentiment > 0 ? '#10b981' : sentiment < 0 ? '#ef4444' : '#6b7280'
    } else if (trend === 'falling') {
      return '#9ca3af'
    }
    return sentiment > 0 ? '#3b82f6' : sentiment < 0 ? '#f59e0b' : '#6b7280'
  }

  useEffect(() => {
    if (!canvasRef.current || !data.length) return

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy()
      chartRef.current = null
    }

    // Limit to top 12 words to avoid performance issues
    const sortedData = [...data]
      .sort((a, b) => b.value - a.value)
      .slice(0, 12)

    // Prepare data for Chart.js
    const words = sortedData.map(item => ({
      text: item.text,
      weight: item.value,
      sentiment: item.sentiment || 0,
      trend: item.trend || 'stable',
      mentions: item.mentions || 0,
      engagement: item.engagement || 0,
      color: getColor(item.sentiment, item.trend)
    }))

    // Create chart
    chartRef.current = new ChartJS(canvasRef.current, {
      type: 'wordCloud',
      data: {
        labels: words.map(d => d.text),
        datasets: [
          {
            label: '',
            data: words.map(d => ({
              text: d.text,
              weight: d.weight,
              sentiment: d.sentiment,
              trend: d.trend,
              mentions: d.mentions,
              engagement: d.engagement,
              color: d.color
            }))
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: (context) => {
                const data = context[0].raw as any
                return data.text
              },
              label: (context) => {
                const data = context.raw as any
                return [
                  `Frequency: ${data.weight}`,
                  `Mentions: ${data.mentions}`,
                  `Engagement: ${data.engagement}`,
                  `Trend: ${data.trend}`,
                  `Sentiment: ${data.sentiment?.toFixed(2) || '0.00'}`
                ]
              }
            }
          }
        },
        scales: {
          x: {
            display: false
          },
          y: {
            display: false
          }
        }
      }
    })

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, [data])

  // Get top 5 trending topics for the list
  const topTrendingTopics = [...data]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="text-lg font-semibold"
          >
            {title}
          </motion.h3>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-2"
          >
            <Hash className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">
              {data.length} Topics
            </span>
          </motion.div>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-md hover:bg-accent transition-colors"
          >
            <Download className="h-4 w-4" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-md hover:bg-accent transition-colors"
          >
            <Maximize2 className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
      
      {/* Word Cloud Canvas */}
      <div className="relative h-80 w-full mb-6 overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </div>
      
      {/* Top Trending Topics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <h4 className="text-sm font-medium text-muted-foreground">Top Trending Topics</h4>
        </div>
        
        {topTrendingTopics.map((topic, index) => (
          <motion.div
            key={topic.text}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 + index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-bold">
                {index + 1}
              </div>
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: getColor(topic.sentiment, topic.trend) }}
              />
              <span className="font-medium">{topic.text}</span>
            </div>
            <div className="text-sm font-bold">{topic.value}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
