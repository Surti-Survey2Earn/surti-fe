"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Coins, Trophy, Star, TrendingUp, Clock, CheckCircle, Plus, BarChart3, Users, Gift } from "lucide-react"
import { useAccount } from "@/app/providers" // Import useAccount from wagmi

// Mock data
const mockUserData = {
  address: "0x1234...5678",
  level: 5,
  xp: 2450,
  xpToNext: 3000,
  tokenBalance: 1250.75,
  reputation: 4.8,
  surveysCompleted: 23,
  nftsEarned: 8,
  totalEarnings: 3420.5,
}

// Updated mock survey data to include xpReward for consistency
const mockSurveys = [
  {
    id: 1,
    title: "DeFi User Experience Research",
    reward: 50,
    xpReward: 150, // Added XP reward
    timeEstimate: "5-10 min",
    category: "DeFi",
    status: "available",
    participants: 234,
    maxParticipants: 500,
  },
  {
    id: 2,
    title: "NFT Market Sentiment Analysis",
    reward: 75,
    xpReward: 200, // Added XP reward
    timeEstimate: "10-15 min",
    category: "NFT",
    status: "available",
    participants: 156,
    maxParticipants: 300,
  },
  {
    id: 3,
    title: "Web3 Gaming Preferences",
    reward: 100,
    xpReward: 250, // Added XP reward
    timeEstimate: "15-20 min",
    category: "Gaming",
    status: "completed",
    participants: 500,
    maxParticipants: 500,
  },
]

const mockAchievements = [
  { name: "First Survey", description: "Complete your first survey", earned: true },
  { name: "Streak Master", description: "Complete 7 surveys in a row", earned: true },
  { name: "Quality Contributor", description: "Maintain 4.5+ rating", earned: true },
  { name: "NFT Collector", description: "Earn 10 NFTs", earned: false },
]

export function UserDashboard() {
  const { isConnected } = useAccount()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  if (!isConnected) {
    router.push("/")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1 w-fit">
                <Coins className="w-4 h-4" />
                {mockUserData.tokenBalance} S2E
              </Badge>
              <Button onClick={() => router.push("/create-survey")} className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Create Survey
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="surveys" className="text-xs sm:text-sm">
              Surveys
            </TabsTrigger>
            <TabsTrigger value="achievements" className="text-xs sm:text-sm">
              Achievements
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs sm:text-sm">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Level</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockUserData.level}</div>
                  <div className="space-y-2 mt-2">
                    <Progress value={(mockUserData.xp / mockUserData.xpToNext) * 100} />
                    <p className="text-xs text-muted-foreground">
                      {mockUserData.xp}/{mockUserData.xpToNext} XP
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reputation</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockUserData.reputation}</div>
                  <p className="text-xs text-muted-foreground">Based on {mockUserData.surveysCompleted} surveys</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${mockUserData.totalEarnings}</div>
                  <p className="text-xs text-muted-foreground">From {mockUserData.surveysCompleted} surveys</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">NFTs Earned</CardTitle>
                  <Gift className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockUserData.nftsEarned}</div>
                  <p className="text-xs text-muted-foreground">Proof of participation</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest survey completions and rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSurveys.slice(0, 3).map((survey) => (
                    <div key={survey.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{survey.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {survey.category} • {survey.timeEstimate}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={survey.status === "completed" ? "default" : "secondary"}>
                          {survey.status === "completed" ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {survey.status}
                        </Badge>
                        <span className="font-medium flex items-center gap-1">
                          <Coins className="w-4 h-4" /> {survey.reward} S2E
                        </span>
                        <span className="font-medium flex items-center gap-1">
                          <Star className="w-4 h-4" /> {survey.xpReward} XP
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="surveys" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Available Surveys</h2>
              <Button variant="outline" onClick={() => router.push("/surveys")}>
                View All Surveys
              </Button>
            </div>

            <div className="grid gap-6">
              {mockSurveys.map((survey) => (
                <Card key={survey.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{survey.title}</CardTitle>
                        <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {survey.timeEstimate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {survey.participants}/{survey.maxParticipants}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="flex items-center gap-2">
                          <div className="text-xl font-bold text-green-600 flex items-center gap-1">
                            <Coins className="w-5 h-5" /> {survey.reward} S2E
                          </div>
                          <div className="text-xl font-bold text-purple-600 flex items-center gap-1">
                            <Star className="w-5 h-5" /> {survey.xpReward} XP
                          </div>
                        </div>
                        <Badge variant="outline" className="mt-2">
                          {survey.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Progress value={(survey.participants / survey.maxParticipants) * 100} className="flex-1 mr-4" />
                      <Button
                        disabled={survey.status === "completed"}
                        onClick={() => router.push(`/survey/${survey.id}`)}
                      >
                        {survey.status === "completed" ? "Completed" : "Start Survey"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <h2 className="text-xl font-semibold">Achievements</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {mockAchievements.map((achievement, index) => (
                <Card
                  key={index}
                  className={achievement.earned ? "border-green-200 bg-green-50 dark:bg-green-900/20" : ""}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          achievement.earned ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <Trophy className={`w-6 h-6 ${achievement.earned ? "text-white" : "text-gray-500"}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{achievement.name}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-xl font-semibold">Your Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Survey Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Completion Rate</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Rating</span>
                      <span className="font-medium">{mockUserData.reputation}/5.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Response Quality</span>
                      <span className="font-medium">Excellent</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total XP Earned</span>
                      <span className="font-medium">{mockUserData.xp} XP</span>
                    </div>
                    <div className="flex justify-between">
                      <span>XP to Next Level</span>
                      <span className="font-medium">{mockUserData.xpToNext - mockUserData.xp} XP</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Earnings Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Survey Rewards</span>
                      <span className="font-medium">$2,850</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bonus Rewards</span>
                      <span className="font-medium">$420</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Referral Bonus</span>
                      <span className="font-medium">$150</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${mockUserData.totalEarnings}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
