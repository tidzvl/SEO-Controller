import { useState, useEffect, useCallback, useRef } from 'react'

export interface RealTimeData {
  timestamp: number
  metrics: {
    sov: number
    sentiment: number
    mentions: number
    engagement: number
  }
  trends: {
    date: string
    mentions: number
    sentiment: number
  }[]
  sentiment: {
    name: string
    value: number
    color: string
  }[]
  competitors: {
    brand: string
    sov: number
    color: string
  }[]
  topics: {
    text: string
    value: number
  }[]
  content: {
    id: number
    title: string
    platform: string
    engagement: number
    reach: number
  }[]
}

interface UseRealTimeDataOptions {
  projectId: string
  interval?: number
  autoConnect?: boolean
}

interface UseRealTimeDataReturn {
  data: RealTimeData | null
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  lastUpdate: Date | null
  connect: () => void
  disconnect: () => void
  refresh: () => void
}

// Mock data generator
const generateMockData = (): RealTimeData => {
  const now = new Date()
  const baseTime = now.getTime()
  
  // Generate trend data for last 7 days
  const trends = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(baseTime - (6 - i) * 24 * 60 * 60 * 1000)
    return {
      date: date.toISOString().split('T')[0],
      mentions: Math.floor(Math.random() * 1000) + 500,
      sentiment: (Math.random() - 0.5) * 2 // -1 to 1
    }
  })

  return {
    timestamp: baseTime,
    metrics: {
      sov: 26.2 + (Math.random() - 0.5) * 2,
      sentiment: 0.34 + (Math.random() - 0.5) * 0.2,
      mentions: 45200 + Math.floor((Math.random() - 0.5) * 5000),
      engagement: 4.8 + (Math.random() - 0.5) * 0.5
    },
    trends,
    sentiment: [
      { name: 'Positive', value: 45 + Math.floor((Math.random() - 0.5) * 10), color: '#10b981' },
      { name: 'Neutral', value: 35 + Math.floor((Math.random() - 0.5) * 10), color: '#6b7280' },
      { name: 'Negative', value: 20 + Math.floor((Math.random() - 0.5) * 10), color: '#ef4444' }
    ],
    competitors: [
      { brand: 'Your Brand', sov: 26.2 + (Math.random() - 0.5) * 2, color: '#3b82f6' },
      { brand: 'Competitor A', sov: 24.8 + (Math.random() - 0.5) * 2, color: '#10b981' },
      { brand: 'Competitor B', sov: 18.5 + (Math.random() - 0.5) * 2, color: '#f59e0b' },
      { brand: 'Competitor C', sov: 15.2 + (Math.random() - 0.5) * 2, color: '#ef4444' },
      { brand: 'Others', sov: 15.3 + (Math.random() - 0.5) * 2, color: '#8b5cf6' }
    ],
    topics: [
      { text: 'coffee', value: 100 + Math.floor((Math.random() - 0.5) * 20) },
      { text: 'quality', value: 80 + Math.floor((Math.random() - 0.5) * 20) },
      { text: 'service', value: 70 + Math.floor((Math.random() - 0.5) * 20) },
      { text: 'price', value: 60 + Math.floor((Math.random() - 0.5) * 20) },
      { text: 'atmosphere', value: 50 + Math.floor((Math.random() - 0.5) * 20) }
    ],
    content: [
      { id: 1, title: 'New Coffee Blend Launch', platform: 'Facebook', engagement: 1250 + Math.floor((Math.random() - 0.5) * 200), reach: 15000 + Math.floor((Math.random() - 0.5) * 2000) },
      { id: 2, title: 'Customer Story Feature', platform: 'Instagram', engagement: 980 + Math.floor((Math.random() - 0.5) * 200), reach: 12000 + Math.floor((Math.random() - 0.5) * 2000) },
      { id: 3, title: 'Behind the Scenes Video', platform: 'TikTok', engagement: 2100 + Math.floor((Math.random() - 0.5) * 200), reach: 25000 + Math.floor((Math.random() - 0.5) * 2000) }
    ]
  }
}

export const useRealTimeData = ({
  projectId,
  interval = 5000,
  autoConnect = true
}: UseRealTimeDataOptions): UseRealTimeDataReturn => {
  const [data, setData] = useState<RealTimeData | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectAttempts = useRef(0)
  const maxReconnectAttempts = 5

  const connect = useCallback(() => {
    if (isConnecting || isConnected) return

    setIsConnecting(true)
    setError(null)

    try {
      // Simulate WebSocket connection
      // In real implementation, this would be:
      // const ws = new WebSocket(`wss://api.smap.com/ws/${projectId}`)
      
      // For demo, we'll simulate connection
      setTimeout(() => {
        setIsConnected(true)
        setIsConnecting(false)
        setLastUpdate(new Date())
        reconnectAttempts.current = 0
        
        // Generate initial data
        setData(generateMockData())
        
        // Start data updates
        intervalRef.current = setInterval(() => {
          setData(prevData => {
            const newData = generateMockData()
            setLastUpdate(new Date())
            return newData
          })
        }, interval)
      }, 1000)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed')
      setIsConnecting(false)
      setIsConnected(false)
    }
  }, [projectId, interval, isConnecting, isConnected])

  const disconnect = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }
    
    setIsConnected(false)
    setIsConnecting(false)
    setError(null)
  }, [])

  const refresh = useCallback(() => {
    if (isConnected) {
      setData(generateMockData())
      setLastUpdate(new Date())
    }
  }, [isConnected])

  // Auto-connect on mount
  useEffect(() => {
    if (autoConnect) {
      connect()
    }
    
    return () => {
      disconnect()
    }
  }, [autoConnect]) // Remove connect and disconnect from dependencies

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect()
    }
  }, []) // Remove disconnect from dependencies

  return {
    data,
    isConnected,
    isConnecting,
    error,
    lastUpdate,
    connect,
    disconnect,
    refresh
  }
}
