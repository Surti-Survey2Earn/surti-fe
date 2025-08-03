"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { Clock, Users, Coins, Search, Star, TrendingUp } from "lucide-react"

// Mock survey data
const mockSurveys = [
  {
    id: 1,
    title: "DeFi User Experience Research",
    description: "Help us understand how users interact with DeFi protocols and what improvements they need.",
    category: "DeFi",
    reward: 50,
    xpReward: 150, // Added XP reward
    timeEstimate: "5-10 min",
    participants: 234,
    maxParticipants: 500,
    creator: "0x1234...5678",
    createdAt: "2024-01-15",
    difficulty: "Easy",
    rating: 4.8,
    tags: ["DeFi", "UX", "Research"],
  },
  {
    id: 2,
    title: "NFT Market Sentiment Analysis",
    description: "Share your thoughts on the current NFT market trends and future predictions.",
    category: "NFT",
    reward: 75,
    xpReward: 200, // Added XP reward
    timeEstimate: "10-15 min",
    participants: 156,
    maxParticipants: 300,
    creator: "0x5678...9012",
    createdAt: "2024-01-16",
    difficulty: "Medium",
    rating: 4.6,
    tags: ["NFT", "Market", "Sentiment"],
  },
  {
    id: 3,
    title: "Web3 Gaming Preferences",
    description: "Tell us about your gaming habits and preferences in the Web3 space.",
    category: "Gaming",
    reward: 100,
    xpReward: 250, // Added XP reward
    timeEstimate: "15-20 min",
    participants: 89,
    maxParticipants: 200,
    creator: "0x9012...3456",
    createdAt: "2024-01-14",
    difficulty: "Hard",
    rating: 4.9,
    tags: ["Gaming", "Web3", "Preferences"],
  },
  {
    id: 4,
    title: "DAO Governance Participation",
    description: "Research on DAO participation patterns and governance effectiveness.",
    category: "DAO",
    reward: 80,
    xpReward: 180, // Added XP reward
    timeEstimate: "8-12 min",
    participants: 67,
    maxParticipants: 150,
    creator: "0x3456...7890",
    createdAt: "2024-01-13",
    difficulty: "Medium",
    rating: 4.7,
    tags: ["DAO", "Governance", "Participation"],
  },
  {
    id: 5,
    title: "Crypto Trading Behavior Study",
    description: "Understanding trading patterns and decision-making processes in crypto markets.",
    category: "Trading",
    reward: 120,
    xpReward: 300, // Added XP reward
    timeEstimate: "20-25 min",
    participants: 23,
    maxParticipants: 100,
    creator: "0x7890...1234",
    createdAt: "2024-01-17",
    difficulty: "Hard",
    rating: 4.5,
    tags: ["Trading", "Behavior", "Analysis"],
  },
  {
    id: 6,
    title: "Web3 Onboarding Experience",
    description: "Help improve the onboarding process for new Web3 users.",
    category: "General",
    reward: 40,
    xpReward: 100, // Added XP reward
    timeEstimate: "3-5 min",
    participants: 345,
    maxParticipants: 500,
    creator: "0x2468...1357",
    createdAt: "2024-01-12",
    difficulty: "Easy",
    rating: 4.4,
    tags: ["Onboarding", "UX", "Web3"],
  },
]

export function SurveyList() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const filteredSurveys = mockSurveys
    .filter(
      (survey) =>
        survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        survey.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        survey.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .filter((survey) => categoryFilter === "all" || survey.category.toLowerCase() === categoryFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case "reward":
          return b.reward - a.reward
        case "participants":
          return b.participants - a.participants
        case "rating":
          return b.rating - a.rating
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Available Surveys</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Earn tokens by sharing your insights and opinions</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {filteredSurveys.length} surveys available
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search surveys, tags, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="defi">DeFi</SelectItem>
                <SelectItem value="nft">NFT</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
                <SelectItem value="dao">DAO</SelectItem>
                <SelectItem value="trading">Trading</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="reward">Highest Reward</SelectItem>
                <SelectItem value="participants">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Survey Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredSurveys.map((survey) => (
            <Card key={survey.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                  <Badge variant="outline">{survey.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{survey.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{survey.title}</CardTitle>
                <CardDescription className="line-clamp-2">{survey.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {survey.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-xs sm:text-sm">{survey.timeEstimate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-xs sm:text-sm">
                      {survey.participants}/{survey.maxParticipants}
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round((survey.participants / survey.maxParticipants) * 100)}%</span>
                  </div>
                  <Progress value={(survey.participants / survey.maxParticipants) * 100} />
                </div>

                {/* Difficulty, Reward, and XP */}
                <div className="flex justify-between items-center">
                  <Badge className={getDifficultyColor(survey.difficulty)}>{survey.difficulty}</Badge>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-lg font-bold text-green-600">
                      <Coins className="w-5 h-5" />
                      {survey.reward} S2E
                    </div>
                    <div className="flex items-center gap-1 text-lg font-bold text-purple-600">
                      <Star className="w-5 h-5" />
                      {survey.xpReward} XP
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  className="w-full"
                  onClick={() => router.push(`/survey/${survey.id}`)}
                  disabled={survey.participants >= survey.maxParticipants}
                >
                  {survey.participants >= survey.maxParticipants ? "Survey Full" : "Start Survey"}
                </Button>

                {/* Creator Info */}
                <div className="text-xs text-gray-500 border-t pt-2">
                  Created by {survey.creator} • {survey.createdAt}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSurveys.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No surveys found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
