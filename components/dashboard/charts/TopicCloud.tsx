import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MoreHorizontal, 
  Download, 
  Maximize2,
  Hash,
  TrendingUp
} from 'lucide-react'

interface TopicData {
  text: string
  value: number
}

interface TopicCloudProps {
  title: string
  data: TopicData[]
  animation?: 'word-cloud' | 'fade-in'
  interaction?: 'click-filter' | 'hover-only'
}

interface WordPosition {
  text: string
  value: number
  x: number
  y: number
  size: number
  color: string
}

export default function TopicCloud({ 
  title, 
  data, 
  animation = 'word-cloud',
  interaction = 'click-filter'
}: TopicCloudProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [wordPositions, setWordPositions] = useState<WordPosition[]>([])
  const [isAnimating, setIsAnimating] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
  ]

  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))

  const getFontSize = (value: number) => {
    const minSize = 12
    const maxSize = 32
    return minSize + ((value - minValue) / (maxValue - minValue)) * (maxSize - minSize)
  }

  const getColor = (index: number) => {
    return colors[index % colors.length]
  }

  const generateWordPositions = () => {
    if (!containerRef.current) return []

    const containerWidth = containerRef.current.clientWidth
    const containerHeight = containerRef.current.clientHeight
    const positions: WordPosition[] = []
    const occupiedAreas: { x: number; y: number; width: number; height: number }[] = []

    data.forEach((item, index) => {
      const fontSize = getFontSize(item.value)
      const color = getColor(index)
      
      // Estimate text width and height
      const textWidth = item.text.length * (fontSize * 0.6)
      const textHeight = fontSize * 1.2
      
      let attempts = 0
      let position: { x: number; y: number } | null = null
      
      while (attempts < 50 && !position) {
        const x = Math.random() * (containerWidth - textWidth)
        const y = Math.random() * (containerHeight - textHeight)
        
        // Check for collisions
        const hasCollision = occupiedAreas.some(area => 
          x < area.x + area.width &&
          x + textWidth > area.x &&
          y < area.y + area.height &&
          y + textHeight > area.y
        )
        
        if (!hasCollision) {
          position = { x, y }
          occupiedAreas.push({ x, y, width: textWidth, height: textHeight })
        }
        
        attempts++
      }
      
      if (position) {
        positions.push({
          text: item.text,
          value: item.value,
          x: position.x,
          y: position.y,
          size: fontSize,
          color
        })
      }
    })

    return positions
  }

  useEffect(() => {
    const handleResize = () => {
      setWordPositions(generateWordPositions())
    }

    // Initial positioning
    setTimeout(() => {
      setWordPositions(generateWordPositions())
      setIsAnimating(false)
    }, 100)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [data])

  const handleTopicClick = (topic: string) => {
    if (interaction === 'click-filter') {
      setSelectedTopic(selectedTopic === topic ? null : topic)
    }
  }

  const getTopTopics = () => {
    return data
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
  }

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
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">
              {data.length} topics trending
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
      
      {/* Word Cloud */}
      <div 
        ref={containerRef}
        className="relative h-80 overflow-hidden rounded-lg bg-muted/20"
      >
        <AnimatePresence>
          {wordPositions.map((word, index) => (
            <motion.div
              key={word.text}
              initial={{ 
                opacity: 0, 
                scale: 0,
                x: word.x + 50,
                y: word.y + 50
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: word.x,
                y: word.y
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.8,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.1,
                zIndex: 10
              }}
              whileTap={{ scale: 0.95 }}
              className={`absolute cursor-pointer transition-all duration-200 ${
                selectedTopic === word.text ? 'ring-2 ring-primary ring-offset-2' : ''
              }`}
              style={{
                fontSize: word.size,
                color: word.color,
                fontWeight: 'bold',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                left: word.x,
                top: word.y,
              }}
              onClick={() => handleTopicClick(word.text)}
            >
              {word.text}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isAnimating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-muted-foreground">Generating word cloud...</div>
          </motion.div>
        )}
      </div>
      
      {/* Top Topics List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mt-6 space-y-2"
      >
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Top Trending Topics</h4>
        {getTopTopics().map((topic, index) => (
          <motion.div
            key={topic.text}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 + index * 0.1 }}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
              selectedTopic === topic.text 
                ? 'bg-primary/10 border border-primary/20' 
                : 'bg-muted/50 hover:bg-muted'
            }`}
            onClick={() => handleTopicClick(topic.text)}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-bold">
                {index + 1}
              </div>
              <Hash className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{topic.text}</span>
            </div>
            <div className="text-sm font-bold" style={{ color: getColor(index) }}>
              {topic.value}
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Selected Topic Details */}
      {selectedTopic && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 p-4 bg-muted/50 rounded-lg"
        >
          <h4 className="font-medium mb-2">Topic Analysis: {selectedTopic}</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <div>Mention Count: {data.find(d => d.text === selectedTopic)?.value}</div>
            <div>Trend Score: {((data.find(d => d.text === selectedTopic)?.value || 0) / maxValue * 100).toFixed(1)}%</div>
            <div className="text-blue-600 font-medium">
              This topic is trending. Consider creating content around this theme.
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
