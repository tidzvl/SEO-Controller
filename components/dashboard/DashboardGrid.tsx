import React from 'react'
import { motion } from 'framer-motion'
import MetricCard from './MetricCard'
import TrendChart from './charts/TrendChart'
import SentimentChart from './charts/SentimentChart'
import CompetitorChart from './charts/CompetitorChart'
import TopicCloud from './charts/TopicCloud'
import DataTable from './DataTable'
import TopicDetailModal from './TopicDetailModal'
import { useDashboard } from '../../contexts/DashboardContext'
import { useTranslation } from 'next-i18next'

export default function DashboardGrid() {
  const { filteredData, isLoading, state, setSelectedTopic } = useDashboard()
  const { i18n } = useTranslation()

  // Get tooltip text based on language
  const getTooltip = (key: string) => {
    const tooltips = {
      sov: {
        vi: 'Tỷ lệ phần trăm thảo luận về thương hiệu của bạn so với tổng số thảo luận của tất cả các thương hiệu được theo dõi trong cùng một dự án.',
        en: 'Percentage of discussions about your brand compared to total discussions of all tracked brands in the same project.'
      },
      sentiment: {
        vi: 'Chỉ số thể hiện cảm xúc ròng của cộng đồng đối với thương hiệu, được tính bằng tỷ lệ phần trăm thảo luận tích cực trừ đi tỷ lệ phần trăm thảo luận tiêu cực.',
        en: 'Index showing the net sentiment of the community towards the brand, calculated as the percentage of positive discussions minus the percentage of negative discussions.'
      },
      mentions: {
        vi: 'Tổng số lần thương hiệu được nhắc đến trên các nền tảng mạng xã hội trong khoảng thời gian được chọn.',
        en: 'Total number of times the brand is mentioned on social media platforms during the selected time period.'
      },
      engagement: {
        vi: 'Tỷ lệ tương tác của người dùng với nội dung thương hiệu, bao gồm like, share, comment và các hành động tương tác khác.',
        en: 'User interaction rate with brand content, including likes, shares, comments and other interactive actions.'
      },
      tti: {
        vi: 'Thời gian từ lúc người dùng thực hiện hành động yêu cầu thông tin cho đến khi họ nhìn thấy được kết quả hoặc insight tương ứng hiển thị trên hệ thống.',
        en: 'Time from when a user performs an action requesting information until they see the corresponding result or insight displayed on the system.'
      },
      confidence: {
        vi: 'Độ tin cậy của phân tích AI, thể hiện mức độ chính xác của kết quả phân tích dữ liệu.',
        en: 'AI analysis confidence level, indicating the accuracy of data analysis results.'
      }
    }
    
    const currentLang = i18n.language || 'vi'
    return tooltips[key as keyof typeof tooltips]?.[currentLang as keyof typeof tooltips[keyof typeof tooltips]] || tooltips[key as keyof typeof tooltips]?.vi
  }

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
      { brand: 'Your Brand', sov: 28.5, color: '#3b82f6' },
      { brand: 'Competitor A', sov: 25.2, color: '#10b981' },
      { brand: 'Competitor B', sov: 19.8, color: '#f59e0b' },
      { brand: 'Competitor C', sov: 16.1, color: '#ef4444' },
      { brand: 'Others', sov: 10.4, color: '#8b5cf6' },
    ],
    topics: [
      { text: 'coffee', value: 100, sentiment: 0.8, trend: 'rising' as 'rising', mentions: 1250, engagement: 320 },
      { text: 'quality', value: 85, sentiment: 0.6, trend: 'stable' as 'stable', mentions: 980, engagement: 280 },
      { text: 'service', value: 75, sentiment: 0.7, trend: 'rising' as 'rising', mentions: 850, engagement: 250 },
      { text: 'price', value: 65, sentiment: -0.2, trend: 'falling' as 'falling', mentions: 720, engagement: 180 },
      { text: 'atmosphere', value: 55, sentiment: 0.9, trend: 'rising' as 'rising', mentions: 650, engagement: 220 },
      { text: 'location', value: 45, sentiment: 0.4, trend: 'stable' as 'stable', mentions: 580, engagement: 150 },
      { text: 'staff', value: 40, sentiment: 0.8, trend: 'rising' as 'rising', mentions: 520, engagement: 200 },
      { text: 'menu', value: 35, sentiment: 0.5, trend: 'stable' as 'stable', mentions: 480, engagement: 120 },
      { text: 'taste', value: 90, sentiment: 0.9, trend: 'rising' as 'rising', mentions: 1100, engagement: 300 },
      { text: 'aroma', value: 70, sentiment: 0.8, trend: 'stable' as 'stable', mentions: 800, engagement: 240 },
      { text: 'fresh', value: 60, sentiment: 0.7, trend: 'rising' as 'rising', mentions: 700, engagement: 190 },
      { text: 'delicious', value: 80, sentiment: 0.9, trend: 'rising' as 'rising', mentions: 950, engagement: 280 },
      { text: 'friendly', value: 50, sentiment: 0.8, trend: 'stable' as 'stable', mentions: 600, engagement: 160 },
      { text: 'comfortable', value: 45, sentiment: 0.6, trend: 'stable' as 'stable', mentions: 550, engagement: 140 },
      { text: 'clean', value: 40, sentiment: 0.7, trend: 'rising' as 'rising', mentions: 500, engagement: 130 },
      { text: 'fast', value: 35, sentiment: 0.5, trend: 'falling' as 'falling', mentions: 450, engagement: 110 },
      { text: 'wifi', value: 30, sentiment: 0.3, trend: 'stable' as 'stable', mentions: 400, engagement: 90 },
      { text: 'music', value: 25, sentiment: 0.4, trend: 'stable' as 'stable', mentions: 350, engagement: 80 },
      { text: 'decor', value: 20, sentiment: 0.6, trend: 'rising' as 'rising', mentions: 300, engagement: 70 },
      { text: 'ambiance', value: 55, sentiment: 0.8, trend: 'rising' as 'rising', mentions: 650, engagement: 180 },
      { text: 'espresso', value: 70, sentiment: 0.9, trend: 'rising' as 'rising', mentions: 800, engagement: 250 },
      { text: 'latte', value: 65, sentiment: 0.8, trend: 'stable' as 'stable', mentions: 750, engagement: 220 },
      { text: 'cappuccino', value: 60, sentiment: 0.7, trend: 'stable' as 'stable', mentions: 700, engagement: 200 },
      { text: 'americano', value: 50, sentiment: 0.6, trend: 'falling' as 'falling', mentions: 600, engagement: 150 },
      { text: 'mocha', value: 45, sentiment: 0.8, trend: 'rising' as 'rising', mentions: 550, engagement: 170 },
      { text: 'macchiato', value: 40, sentiment: 0.7, trend: 'stable' as 'stable', mentions: 500, engagement: 140 },
      { text: 'frappuccino', value: 35, sentiment: 0.5, trend: 'falling' as 'falling', mentions: 450, engagement: 120 },
      { text: 'cold brew', value: 55, sentiment: 0.8, trend: 'rising' as 'rising', mentions: 650, engagement: 190 },
      { text: 'iced coffee', value: 50, sentiment: 0.7, trend: 'stable' as 'stable', mentions: 600, engagement: 160 },
      { text: 'hot chocolate', value: 30, sentiment: 0.9, trend: 'rising' as 'rising', mentions: 400, engagement: 130 },
      { text: 'tea', value: 25, sentiment: 0.6, trend: 'stable' as 'stable', mentions: 350, engagement: 100 },
      { text: 'pastry', value: 40, sentiment: 0.8, trend: 'rising' as 'rising', mentions: 500, engagement: 150 },
      { text: 'croissant', value: 35, sentiment: 0.9, trend: 'rising' as 'rising', mentions: 450, engagement: 140 },
      { text: 'muffin', value: 30, sentiment: 0.7, trend: 'stable' as 'stable', mentions: 400, engagement: 120 },
      { text: 'sandwich', value: 25, sentiment: 0.6, trend: 'falling' as 'falling', mentions: 350, engagement: 90 },
      { text: 'salad', value: 20, sentiment: 0.5, trend: 'stable' as 'stable', mentions: 300, engagement: 80 },
      { text: 'breakfast', value: 45, sentiment: 0.8, trend: 'rising' as 'rising', mentions: 550, engagement: 160 },
      { text: 'lunch', value: 40, sentiment: 0.7, trend: 'stable' as 'stable', mentions: 500, engagement: 140 },
      { text: 'dinner', value: 30, sentiment: 0.6, trend: 'falling' as 'falling', mentions: 400, engagement: 110 },
      { text: 'snack', value: 25, sentiment: 0.5, trend: 'stable' as 'stable', mentions: 350, engagement: 90 },
      { text: 'dessert', value: 35, sentiment: 0.9, trend: 'rising' as 'rising', mentions: 450, engagement: 130 },
      { text: 'cake', value: 30, sentiment: 0.8, trend: 'stable' as 'stable', mentions: 400, engagement: 120 },
      { text: 'cookie', value: 25, sentiment: 0.7, trend: 'rising' as 'rising', mentions: 350, engagement: 100 },
      { text: 'brownie', value: 20, sentiment: 0.9, trend: 'rising' as 'rising', mentions: 300, engagement: 90 },
      { text: 'smoothie', value: 35, sentiment: 0.8, trend: 'rising' as 'rising', mentions: 450, engagement: 140 },
      { text: 'juice', value: 30, sentiment: 0.7, trend: 'stable' as 'stable', mentions: 400, engagement: 110 },
      { text: 'water', value: 15, sentiment: 0.3, trend: 'stable' as 'stable', mentions: 200, engagement: 50 },
      { text: 'energy', value: 40, sentiment: 0.6, trend: 'rising' as 'rising', mentions: 500, engagement: 150 },
      { text: 'relax', value: 35, sentiment: 0.8, trend: 'stable' as 'stable', mentions: 450, engagement: 130 },
      { text: 'work', value: 30, sentiment: 0.4, trend: 'falling' as 'falling', mentions: 400, engagement: 100 },
      { text: 'study', value: 25, sentiment: 0.5, trend: 'stable' as 'stable', mentions: 350, engagement: 90 },
      { text: 'meeting', value: 20, sentiment: 0.3, trend: 'falling' as 'falling', mentions: 300, engagement: 70 },
      { text: 'date', value: 30, sentiment: 0.9, trend: 'rising' as 'rising', mentions: 400, engagement: 120 },
      { text: 'friends', value: 35, sentiment: 0.8, trend: 'stable' as 'stable', mentions: 450, engagement: 140 },
      { text: 'family', value: 25, sentiment: 0.7, trend: 'rising' as 'rising', mentions: 350, engagement: 100 },
      { text: 'business', value: 28, sentiment: 0.5, trend: 'stable' as 'stable', mentions: 380, engagement: 95 },
      { text: 'creative', value: 22, sentiment: 0.8, trend: 'rising' as 'rising', mentions: 320, engagement: 85 },
      { text: 'inspiring', value: 18, sentiment: 0.9, trend: 'rising' as 'rising', mentions: 280, engagement: 75 },
      { text: 'community', value: 32, sentiment: 0.7, trend: 'stable' as 'stable', mentions: 420, engagement: 110 },
      { text: 'sustainable', value: 26, sentiment: 0.8, trend: 'rising' as 'rising', mentions: 360, engagement: 90 },
      { text: 'organic', value: 24, sentiment: 0.7, trend: 'stable' as 'stable', mentions: 340, engagement: 80 },
      { text: 'local', value: 29, sentiment: 0.6, trend: 'rising' as 'rising', mentions: 390, engagement: 105 },
      { text: 'artisan', value: 21, sentiment: 0.8, trend: 'rising' as 'rising', mentions: 310, engagement: 70 },
      { text: 'premium', value: 33, sentiment: 0.7, trend: 'stable' as 'stable', mentions: 440, engagement: 115 },
      { text: 'authentic', value: 27, sentiment: 0.8, trend: 'rising' as 'rising', mentions: 370, engagement: 95 },
      { text: 'innovative', value: 23, sentiment: 0.6, trend: 'falling' as 'falling', mentions: 330, engagement: 85 },
      { text: 'trendy', value: 19, sentiment: 0.5, trend: 'falling' as 'falling', mentions: 290, engagement: 65 },
      { text: 'vintage', value: 17, sentiment: 0.7, trend: 'stable' as 'stable', mentions: 270, engagement: 60 },
      { text: 'modern', value: 31, sentiment: 0.6, trend: 'stable' as 'stable', mentions: 410, engagement: 100 },
      { text: 'cozy', value: 36, sentiment: 0.9, trend: 'rising' as 'rising', mentions: 460, engagement: 125 },
      { text: 'chic', value: 20, sentiment: 0.7, trend: 'rising' as 'rising', mentions: 300, engagement: 70 },
      { text: 'elegant', value: 25, sentiment: 0.8, trend: 'stable' as 'stable', mentions: 350, engagement: 90 },
      { text: 'rustic', value: 18, sentiment: 0.6, trend: 'falling' as 'falling', mentions: 280, engagement: 65 },
      { text: 'minimalist', value: 22, sentiment: 0.5, trend: 'rising' as 'rising', mentions: 320, engagement: 75 },
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
      value: `${data.competitors.find(c => c.brand === 'Your Brand')?.sov.toFixed(1) || data.metrics.sov.toFixed(1)}%`,
      delta: '+2.3%',
      trend: 'up' as const,
      animation: 'counter' as const,
      color: 'text-blue-600',
      tooltip: getTooltip('sov')
    },
    {
      id: 'sentiment',
      title: 'Net Sentiment',
      value: data.metrics.sentiment > 0 ? `+${data.metrics.sentiment.toFixed(2)}` : data.metrics.sentiment.toFixed(2),
      delta: '-0.12',
      trend: data.metrics.sentiment > 0 ? 'up' as const : 'down' as const,
      animation: 'gauge' as const,
      color: data.metrics.sentiment > 0 ? 'text-green-600' : 'text-red-600',
      tooltip: getTooltip('sentiment')
    },
    {
      id: 'mentions',
      title: 'Total Mentions',
      value: data.metrics.mentions >= 1000 ? `${(data.metrics.mentions / 1000).toFixed(1)}K` : data.metrics.mentions.toString(),
      delta: '+12.3%',
      trend: 'up' as const,
      animation: 'counter' as const,
      color: 'text-purple-600',
      tooltip: getTooltip('mentions')
    },
    {
      id: 'engagement',
      title: 'Engagement Rate',
      value: `${data.metrics.engagement.toFixed(1)}%`,
      delta: '+0.3%',
      trend: 'up' as const,
      animation: 'progress' as const,
      color: 'text-orange-600',
      tooltip: getTooltip('engagement')
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
    <>
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
          {data.competitors && data.competitors.length > 0 ? (
            <CompetitorChart 
              title="Share of Voice Comparison"
              data={data.competitors}
              animation="bar-stack"
              interaction="drill-down"
            />
          ) : (
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-center h-80">
                <div className="text-center">
                  <div className="text-muted-foreground mb-2">No competitor data available</div>
                  <div className="text-sm text-muted-foreground">Please check your data source</div>
                </div>
              </div>
            </div>
          )}
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
            onTopicClick={setSelectedTopic}
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

    {/* Topic Detail Modal */}
    <TopicDetailModal
      topic={state.selectedTopic}
      isOpen={!!state.selectedTopic}
      onClose={() => setSelectedTopic(null)}
    />
  </>
  )
}
