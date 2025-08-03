"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Plus, Edit, Eye, BarChart3, Coins, Users, Clock, Star, FileText, Send, Trash2 } from "lucide-react"
import { useToast } from "src/hooks/use-toast"

// Mock data for user's created surveys (same as in survey-builder for consistency)
// In a real app, this would be fetched from a backend/database for the current user
const mockUserCreatedSurveys = [
  {
    id: "survey-101",
    title: "My Draft Survey 1",
    description: "This is a survey I'm still working on.",
    category: "General",
    estimatedTime: "5-10 min",
    rewardAmount: 20,
    maxParticipants: 50,
    questions: [
      { id: "q1", type: "text", title: "What is your favorite Web3 project?", required: true },
      {
        id: "q2",
        type: "single-choice",
        title: "How often do you use dApps?",
        required: false,
        options: ["Daily", "Weekly", "Monthly"],
      },
    ],
    xpReward: 100,
    status: "draft",
    createdAt: "2024-07-28",
  },
  {
    id: "survey-102",
    title: "Published Web3 Trends Survey",
    description: "A survey about the latest trends in Web3.",
    category: "Web3",
    estimatedTime: "10-15 min",
    rewardAmount: 60,
    maxParticipants: 200,
    questions: [
      {
        id: "q3",
        type: "multiple-choice",
        title: "Which blockchain networks do you use?",
        required: true,
        options: ["Ethereum", "Solana", "Polygon", "Arbitrum"],
      },
      {
        id: "q4",
        type: "rating",
        title: "Rate your satisfaction with current NFT marketplaces.",
        required: true,
        min: 1,
        max: 5,
      },
    ],
    xpReward: 250,
    status: "published",
    createdAt: "2024-07-20",
    participants: 120,
  },
  {
    id: "survey-103",
    title: "Another Draft Survey",
    description: "Still needs more questions.",
    category: "DeFi",
    estimatedTime: "3-5 min",
    rewardAmount: 30,
    maxParticipants: 75,
    questions: [],
    xpReward: 150,
    status: "draft",
    createdAt: "2024-07-29",
  },
  {
    id: "survey-104",
    title: "Completed NFT Art Survey",
    description: "Insights on the digital art market.",
    category: "NFT",
    estimatedTime: "15-20 min",
    rewardAmount: 80,
    maxParticipants: 100,
    questions: [
      { id: "q5", type: "text", title: "What is your favorite NFT collection?", required: false },
      {
        id: "q6",
        type: "scale",
        title: "How likely are you to invest in fractionalized NFTs?",
        required: true,
        min: 1,
        max: 10,
      },
    ],
    xpReward: 300,
    status: "published",
    createdAt: "2024-07-10",
    participants: 100, // Fully completed
  },
]

export function MySurveys() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("drafts")
  const [surveys, setSurveys] = useState(mockUserCreatedSurveys) // Use local state for mock data

  const draftSurveys = surveys.filter((s) => s.status === "draft")
  const publishedSurveys = surveys.filter((s) => s.status === "published")

  const handlePublish = (surveyId: string) => {
    // In a real app, this would call an API to publish
    setSurveys((prev) =>
      prev.map((s) =>
        s.id === surveyId ? { ...s, status: "published", createdAt: new Date().toISOString().split("T")[0] } : s,
      ),
    )
    toast({
      title: "Survey Published!",
      description: "Your draft survey is now live.",
    })
  }

  const handleDelete = (surveyId: string) => {
    // In a real app, this would call an API to delete
    setSurveys((prev) => prev.filter((s) => s.id !== surveyId))
    toast({
      title: "Survey Deleted",
      description: "The survey has been removed.",
      variant: "destructive",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">My Surveys</h1>
          <Button onClick={() => router.push("/create-survey")}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Survey
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="drafts" className="text-xs sm:text-sm">
              Drafts ({draftSurveys.length})
            </TabsTrigger>
            <TabsTrigger value="published" className="text-xs sm:text-sm">
              Published ({publishedSurveys.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drafts" className="space-y-6">
            {draftSurveys.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No draft surveys</h3>
                  <p className="text-gray-500 mb-4">Start creating your first survey!</p>
                  <Button onClick={() => router.push("/create-survey")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Survey
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {draftSurveys.map((survey) => (
                  <Card key={survey.id}>
                    <CardHeader className="pb-4">
                      <Badge variant="secondary" className="w-fit mb-2">
                        Draft
                      </Badge>
                      <CardTitle className="text-lg">{survey.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{survey.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span>{survey.questions.length} Qs</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{survey.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Coins className="w-4 h-4 text-gray-500" />
                          <span>{survey.rewardAmount} S2E</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-gray-500" />
                          <span>{survey.xpReward} XP</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/create-survey?id=${survey.id}`)}
                          className="flex-1"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" onClick={() => handlePublish(survey.id!)} className="flex-1">
                          <Send className="w-4 h-4 mr-2" />
                          Publish
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(survey.id!)}
                          className="flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="published" className="space-y-6">
            {publishedSurveys.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No published surveys</h3>
                  <p className="text-gray-500 mb-4">Publish your drafts to see them here!</p>
                  <Button onClick={() => router.push("/create-survey")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Survey
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {publishedSurveys.map((survey) => (
                  <Card key={survey.id}>
                    <CardHeader className="pb-4">
                      <Badge className="w-fit mb-2">Published</Badge>
                      <CardTitle className="text-lg">{survey.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{survey.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span>{survey.questions.length} Qs</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{survey.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Coins className="w-4 h-4 text-gray-500" />
                          <span>{survey.rewardAmount} S2E</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-gray-500" />
                          <span>{survey.xpReward} XP</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span>
                            {survey.participants || 0}/{survey.maxParticipants}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{survey.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/survey/${survey.id}`)}
                          className="flex-1"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Survey
                        </Button>
                        <Button
                          size="sm"
                          onClick={() =>
                            toast({ title: "View Analytics", description: "Analytics feature coming soon!" })
                          }
                          className="flex-1"
                        >
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Analytics
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
