import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts'
import { 
  MoreHorizontal, 
  Download, 
  Maximize2,
  TrendingUp,
  TrendingDown,
  Target
} from 'lucide-react'

interface CompetitorData {
  brand: string
  sov: number
  color: string
}

interface CompetitorChartProps {
  title: string
  data: CompetitorData[]
  animation?: 'bar-stack' | 'fade-in'
  interaction?: 'drill-down' | 'hover-only'
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-lg p-3 shadow-lg"
      >
        <p className="text-sm font-medium mb-2">{label}</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data.color }}
            />
            <span className="text-muted-foreground">Share of Voice:</span>
            <span className="font-medium">{data.sov}%</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Rank: #{data.rank || 'N/A'}
          </div>
        </div>
      </motion.div>
    )
  }
  return null
}

export default function CompetitorChart({ 
  title, 
  data, 
  animation = 'bar-stack',
  interaction = 'hover-only'
}: CompetitorChartProps) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'sov' | 'alphabetical'>('sov')

  // Sort data based on selected criteria
  const sortedData = [...data].sort((a, b) => {
    if (sortBy === 'sov') {
      return b.sov - a.sov
    } else {
      return a.brand.localeCompare(b.brand)
    }
  })

  // Add rank to data
  const rankedData = sortedData.map((item, index) => ({
    ...item,
    rank: index + 1
  }))

  const getMarketLeader = () => {
    return rankedData[0]
  }

  const getYourBrandPosition = () => {
    const yourBrand = rankedData.find(item => item.brand === 'Your Brand')
    return yourBrand ? yourBrand.rank : null
  }

  const marketLeader = getMarketLeader()
  const yourBrandPosition = getYourBrandPosition()

  const handleBarClick = (data: any) => {
    if (interaction === 'drill-down') {
      setSelectedBrand(selectedBrand === data.brand ? null : data.brand)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg font-semibold"
          >
            {title}
          </motion.h3>
          
          {yourBrandPosition && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2"
            >
              <Target className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                Your Brand: #{yourBrandPosition}
              </span>
            </motion.div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Sort Options */}
          <div className="flex items-center bg-muted rounded-md p-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSortBy('sov')}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                sortBy === 'sov' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              SOV
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSortBy('alphabetical')}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                sortBy === 'alphabetical' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              A-Z
            </motion.button>
          </div>
          
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
      
      {/* Market Leader Info */}
      {marketLeader && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-4 p-3 bg-muted/50 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">
              Market Leader: {marketLeader.brand} with {marketLeader.sov}% Share of Voice
            </span>
          </div>
        </motion.div>
      )}
      
      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
          <BarChart 
            data={rankedData} 
            layout="horizontal"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              type="number" 
              domain={[0, 100]} 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickLine={{ stroke: '#e5e7eb' }}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis 
              dataKey="brand" 
              type="category" 
              width={100}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Bar 
              dataKey="sov" 
              radius={[0, 4, 4, 0]}
              animationDuration={2000}
              animationEasing="ease-out"
              onClick={handleBarClick}
            >
              {rankedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className={`hover:opacity-80 transition-opacity cursor-pointer ${
                    selectedBrand === entry.brand ? 'opacity-80' : ''
                  }`}
                  stroke={selectedBrand === entry.brand ? '#000' : 'none'}
                  strokeWidth={selectedBrand === entry.brand ? 2 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Brand Rankings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 space-y-2"
      >
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Brand Rankings</h4>
        {rankedData.map((item, index) => (
          <motion.div
            key={item.brand}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
              selectedBrand === item.brand 
                ? 'bg-primary/10 border border-primary/20' 
                : 'bg-muted/50 hover:bg-muted'
            }`}
            onClick={() => setSelectedBrand(
              selectedBrand === item.brand ? null : item.brand
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-bold">
                {item.rank}
              </div>
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium">{item.brand}</span>
            </div>
            <div className="text-sm font-bold">{item.sov}%</div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Selected Brand Details */}
      {selectedBrand && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 p-4 bg-muted/50 rounded-lg"
        >
          <h4 className="font-medium mb-2">Analysis for {selectedBrand}</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <div>Share of Voice: {rankedData.find(d => d.brand === selectedBrand)?.sov}%</div>
            <div>Market Position: #{rankedData.find(d => d.brand === selectedBrand)?.rank}</div>
            {selectedBrand === 'Your Brand' && (
              <div className="text-blue-600 font-medium">
                This is your brand. Consider strategies to increase market share.
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
