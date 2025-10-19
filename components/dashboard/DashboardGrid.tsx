import React from 'react'
import { motion } from 'framer-motion'
import MetricCard from './MetricCard'
import TrendChart from './charts/TrendChart'
import SentimentChart from './charts/SentimentChart'
import CompetitorChart from './charts/CompetitorChart'
import TopicCloud from './charts/TopicCloud'
import DataTable from './DataTable'
import { useDashboard } from '@/contexts/DashboardContext'

export default function DashboardGrid() {
  const { filteredData, isLoading } = useDashboard()

  // Use real-time data or fallback to mock data
  const data = filteredData || {
    metrics: {
      sov: 26.2,
      sentiment: 0.34,
      mentions: 45200,
      engagement: 4.8
    },
    trends: [
      { date: '2024-01-01', mentions: 1200, sentiment: 0.2 },
      { date: '2024-01-02', mentions: 1350, sentiment: 0.3 },
      { date: '2024-01-03', mentions: 1100, sentiment: 0.1 },
      { date: '2024-01-04', mentions: 1600, sentiment: 0.4 },
      { date: '2024-01-05', mentions: 1800, sentiment: 0.5 },
      { date: '2024-01-06', mentions: 1500, sentiment: 0.3 },
      { date: '2024-01-07', mentions: 2000, sentiment: 0.6 },
    ],
    sentiment: [
      { name: 'Positive', value: 45, color: '#10b981' },
      { name: 'Neutral', value: 35, color: '#6b7280' },
      { name: 'Negative', value: 20, color: '#ef4444' },
    ],
    competitors: [
      { brand: 'Your Brand', sov: 26.2, color: '#3b82f6' },
      { brand: 'Competitor A', sov: 24.8, color: '#10b981' },
      { brand: 'Competitor B', sov: 18.5, color: '#f59e0b' },
      { brand: 'Competitor C', sov: 15.2, color: '#ef4444' },
      { brand: 'Others', sov: 15.3, color: '#8b5cf6' },
    ],
    topics: [
      { text: 'coffee', value: 100 },
      { text: 'quality', value: 80 },
      { text: 'service', value: 70 },
      { text: 'price', value: 60 },
      { text: 'atmosphere', value: 50 },
      { text: 'location', value: 40 },
      { text: 'staff', value: 35 },
      { text: 'menu', value: 30 },
    ],
    content: [
      { id: 1, title: 'New Coffee Blend Launch', platform: 'Facebook', engagement: 1250, reach: 15000 },
      { id: 2, title: 'Customer Story Feature', platform: 'Instagram', engagement: 980, reach: 12000 },
      { id: 3, title: 'Behind the Scenes Video', platform: 'TikTok', engagement: 2100, reach: 25000 },
      { id: 4, title: 'Seasonal Menu Update', platform: 'Facebook', engagement: 750, reach: 9000 },
      { id: 5, title: 'Staff Appreciation Post', platform: 'Instagram', engagement: 650, reach: 8000 },
    ]
  }

  const metrics = [
    {
      id: 'sov',
      title: 'Share of Voice',
      value: `${data.metrics.sov.toFixed(1)}%`,
      delta: '+2.1%',
      trend: 'up' as const,
      animation: 'counter' as const,
      color: 'text-blue-600'
    },
    {
      id: 'sentiment',
      title: 'Net Sentiment',
      value: data.metrics.sentiment > 0 ? `+${data.metrics.sentiment.toFixed(2)}` : data.metrics.sentiment.toFixed(2),
      delta: '-0.12',
      trend: data.metrics.sentiment > 0 ? 'up' as const : 'down' as const,
      animation: 'gauge' as const,
      color: data.metrics.sentiment > 0 ? 'text-green-600' : 'text-red-600'
    },
    {
      id: 'mentions',
      title: 'Total Mentions',
      value: data.metrics.mentions >= 1000 ? `${(data.metrics.mentions / 1000).toFixed(1)}K` : data.metrics.mentions.toString(),
      delta: '+12.3%',
      trend: 'up' as const,
      animation: 'counter' as const,
      color: 'text-purple-600'
    },
    {
      id: 'engagement',
      title: 'Engagement Rate',
      value: `${data.metrics.engagement.toFixed(1)}%`,
      delta: '+0.3%',
      trend: 'up' as const,
      animation: 'progress' as const,
      color: 'text-orange-600'
    }
  ]

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/3"></div>
            </div>
          ))}
        </div>
        <div className="h-80 bg-card border border-border rounded-lg animate-pulse"></div>
      </div>
    )
  }
  return (
    <div className="p-6 space-y-6">
      {/* Row 1: Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <MetricCard {...metric} />
          </motion.div>
        ))}
      </motion.div>

      {/* Row 2: Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="lg:col-span-2"
        >
          <TrendChart 
            title="Trend Analysis"
            data={data.trends}
            animation="line-draw"
            interaction="zoom-pan"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <SentimentChart 
            title="Sentiment Distribution"
            data={data.sentiment}
            animation="pie-reveal"
            interaction="hover-details"
          />
        </motion.div>
      </div>

      {/* Row 3: Competitive Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <CompetitorChart 
            title="Share of Voice Comparison"
            data={data.competitors}
            animation="bar-stack"
            interaction="drill-down"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <TopicCloud 
            title="Trending Topics"
            data={data.topics}
            animation="word-cloud"
            interaction="click-filter"
          />
        </motion.div>
      </div>

      {/* Row 4: Detailed Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <DataTable 
          title="Top Performing Content"
          data={data.content}
          animation="row-reveal"
          interaction="sort-filter"
        />
      </motion.div>
    </div>
  )
}
