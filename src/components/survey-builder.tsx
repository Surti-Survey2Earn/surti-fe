'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Plus,
  Trash2,
  GripVertical,
  Type,
  CheckSquare,
  Circle,
  Star,
  FileSlidersIcon as Slider,
  Calendar,
  FileText,
  Coins,
  Users,
  Clock,
  Save,
  Send,
  ListChecks,
} from "lucide-react"

interface Question {
  id: string
  type: "text" | "multiple-choice" | "single-choice" | "rating" | "scale" | "date"
  title: string
  description?: string
  required: boolean
  options?: string[]
  min?: number
  max?: number
}

interface Survey {
  id?: string // Optional for new surveys, will be generated
  title: string
  description: string
  category: string
  estimatedTime: string
  rewardAmount: number
  maxParticipants: number
  questions: Question[]
  xpReward: number // New field for XP reward
  status: "draft" | "published" // New field for survey status
  createdAt?: string // For display in MySurveys
  participants?: number // For display in MySurveys (for published surveys)
}

const questionTypes = [
  { type: "text", label: "Text Input", icon: Type },
  { type: "multiple-choice", label: "Multiple Choice", icon: CheckSquare },
  { type: "single-choice", label: "Single Choice", icon: Circle },
  { type: "rating", label: "Rating", icon: Star },
  { type: "scale", label: "Scale", icon: Slider },
  { type: "date", label: "Date", icon: Calendar },
]

// Mock data for user's created surveys (simulating a database)
// In a real app, this would be fetched from a backend/database
const mockUserCreatedSurveys: Survey[] = [
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

export function SurveyBuilder() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const surveyId = searchParams.get("id")

  const [activeTab, setActiveTab] = useState("basic")
  const [survey, setSurvey] = useState<Survey>({
    title: "",
    description: "",
    category: "",
    estimatedTime: "",
    rewardAmount: 0,
    maxParticipants: 0,
    questions: [],
    xpReward: 0, // Default XP reward
    status: "draft", // Default status
  })

  useEffect(() => {
    if (surveyId) {
      // Simulate fetching survey data
      const existingSurvey = mockUserCreatedSurveys.find((s) => s.id === surveyId)
      if (existingSurvey) {
        setSurvey(existingSurvey)
        toast({
          title: "Survey Loaded",
          description: `Editing survey: "${existingSurvey.title}"`,
        })
      } else {
        toast({
          title: "Survey Not Found",
          description: "Could not load the requested survey.",
          variant: "destructive",
        })
        router.push("/my-surveys") // Redirect if not found
      }
    }
  }, [surveyId, router, toast])

  const addQuestion = (type: Question["type"]) => {
    const newQuestion: Question = {
      id: `q-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, // Unique ID
      type,
      title: "",
      required: false,
      ...(type === "multiple-choice" || type === "single-choice" ? { options: [""] } : {}),
      ...(type === "rating" ? { min: 1, max: 5 } : {}),
      ...(type === "scale" ? { min: 1, max: 10 } : {}),
    }
    setSurvey((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }))
  }

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => (q.id === id ? { ...q, ...updates } : q)),
    }))
  }

  const deleteQuestion = (id: string) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== id),
    }))
  }

  const addOption = (questionId: string) => {
    updateQuestion(questionId, {
      options: [...(survey.questions.find((q) => q.id === questionId)?.options || []), ""],
    })
  }

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    const question = survey.questions.find((q) => q.id === questionId)
    if (question?.options) {
      const newOptions = [...question.options]
      newOptions[optionIndex] = value
      updateQuestion(questionId, { options: newOptions })
    }
  }

  const removeOption = (questionId: string, optionIndex: number) => {
    const question = survey.questions.find((q) => q.id === questionId)
    if (question?.options && question.options.length > 1) {
      const newOptions = question.options.filter((_, index) => index !== optionIndex)
      updateQuestion(questionId, { options: newOptions })
    }
  }

  const validateSurvey = () => {
    if (
      !survey.title ||
      !survey.description ||
      !survey.category ||
      !survey.estimatedTime ||
      survey.rewardAmount <= 0 ||
      survey.maxParticipants <= 0 ||
      survey.xpReward <= 0
    ) {
      toast({
        title: "Incomplete Survey Details",
        description: "Please fill in all basic information, reward, participants, and XP reward.",
        variant: "destructive",
      })
      return false
    }
    if (survey.questions.length === 0) {
      toast({
        title: "No Questions Added",
        description: "Please add at least one question to your survey.",
        variant: "destructive",
      })
      return false
    }
    for (const q of survey.questions) {
      if (!q.title) {
        toast({
          title: "Missing Question Title",
          description: `Question ${survey.questions.indexOf(q) + 1} is missing a title.`,
          variant: "destructive",
        })
        return false
      }
      if (
        (q.type === "multiple-choice" || q.type === "single-choice") &&
        (!q.options || q.options.length < 1 || q.options.some((opt) => !opt))
      ) {
        toast({
          title: "Missing Options",
          description: `Question ${survey.questions.indexOf(q) + 1} needs at least one option, and all options must be filled.`,
          variant: "destructive",
        })
        return false
      }
    }
    return true
  }

  const handleSaveDraft = () => {
    // In a real app, save to database
    const surveyToSave: Survey = {
      ...survey,
      status: "draft" as const, // Type assertion yang tepat
      id: survey.id || `survey-${Date.now()}`
    }

    const existingIndex = mockUserCreatedSurveys.findIndex(
      (s) => s.id === surveyToSave.id
    )

    if (existingIndex > -1) {
      mockUserCreatedSurveys[existingIndex] = surveyToSave
    } else {
      mockUserCreatedSurveys.push(surveyToSave)
    }

    setSurvey(surveyToSave)
    toast({
      title: "Survey Saved as Draft!",
      description: "Your survey has been saved and can be edited later.",
    })
    router.push("/my-surveys") // Redirect to my surveys page
  }

  const handlePublish = () => {
    if (!validateSurvey()) {
      return
    }

    // Mock publish logic
    const surveyToPublish: Survey = {
      ...survey,
      status: "published" as const, // Type assertion yang tepat
      id: survey.id || `survey-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    }
    const existingIndex = mockUserCreatedSurveys.findIndex((s) => s.id === surveyToPublish.id)
    if (existingIndex > -1) {
      mockUserCreatedSurveys[existingIndex] = surveyToPublish
    } else {
      mockUserCreatedSurveys.push(surveyToPublish)
    }
    setSurvey(surveyToPublish) // Update state with new ID if it was a new survey

    toast({
      title: "Survey Published!",
      description: "Your survey has been published and is now live.",
    })
    router.push("/my-surveys") // Redirect to my surveys page
  }

  const estimatedCost = survey.rewardAmount * survey.maxParticipants

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4 relative flex items-center justify-center">
        <div className="mt-20">
          <h1 className="text-2xl font-bold text-center">
            {surveyId ? "Edit Survey" : "Create New Survey"}
          </h1>
          <div className="absolute right-4 center">
            <Button variant="outline" onClick={() => router.push("/my-surveys")}>
              <ListChecks className="w-4 h-4 mr-2" />
              My Surveys
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic" className="text-xs sm:text-sm">
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="questions" className="text-xs sm:text-sm">
                  Questions
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-xs sm:text-sm">
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Survey Information</CardTitle>
                    <CardDescription>Basic details about your survey</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Survey Title</Label>
                      <Input
                        id="title"
                        value={survey.title}
                        onChange={(e) => setSurvey((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter survey title"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={survey.description}
                        onChange={(e) => setSurvey((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe what your survey is about"
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={survey.category}
                          onValueChange={(value) => setSurvey((prev) => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="defi">DeFi</SelectItem>
                            <SelectItem value="nft">NFT</SelectItem>
                            <SelectItem value="gaming">Gaming</SelectItem>
                            <SelectItem value="dao">DAO</SelectItem>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="web3">Web3</SelectItem>
                            <SelectItem value="trading">Trading</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="time">Estimated Time</Label>
                        <Select
                          value={survey.estimatedTime}
                          onValueChange={(value) => setSurvey((prev) => ({ ...prev, estimatedTime: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-3 min">1-3 minutes</SelectItem>
                            <SelectItem value="3-5 min">3-5 minutes</SelectItem>
                            <SelectItem value="5-10 min">5-10 minutes</SelectItem>
                            <SelectItem value="10-15 min">10-15 minutes</SelectItem>
                            <SelectItem value="15+ min">15+ minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="questions" className="space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <h2 className="text-xl font-semibold">Survey Questions</h2>
                  <div className="flex flex-wrap gap-2">
                    {questionTypes.map((type) => (
                      <Button
                        key={type.type}
                        variant="outline"
                        size="sm"
                        onClick={() => addQuestion(type.type as Question["type"])}
                        className="flex items-center gap-1 text-xs sm:text-sm"
                      >
                        <type.icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{type.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {survey.questions.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No questions yet</h3>
                      <p className="text-gray-500 mb-4">Add your first question using the buttons above</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {survey.questions.map((question, index) => (
                      <Card key={question.id}>
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <GripVertical className="w-4 h-4 text-gray-400" />
                              <Badge variant="outline">
                                {questionTypes.find((t) => t.type === question.type)?.label}
                              </Badge>
                              <span className="text-sm text-gray-500">Question {index + 1}</span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => deleteQuestion(question.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label>Question Title</Label>
                            <Input
                              value={question.title}
                              onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                              placeholder="Enter your question"
                            />
                          </div>

                          {question.description !== undefined && (
                            <div>
                              <Label>Description (Optional)</Label>
                              <Input
                                value={question.description}
                                onChange={(e) => updateQuestion(question.id, { description: e.target.value })}
                                placeholder="Additional context for the question"
                              />
                            </div>
                          )}

                          {(question.type === "multiple-choice" || question.type === "single-choice") && (
                            <div>
                              <Label>Options</Label>
                              <div className="space-y-2">
                                {question.options?.map((option, optionIndex) => (
                                  <div key={optionIndex} className="flex gap-2">
                                    <Input
                                      value={option}
                                      onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                                      placeholder={`Option ${optionIndex + 1}`}
                                    />
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => removeOption(question.id, optionIndex)}
                                      disabled={question.options!.length <= 1}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button variant="outline" size="sm" onClick={() => addOption(question.id)}>
                                  <Plus className="w-4 h-4 mr-1" />
                                  Add Option
                                </Button>
                              </div>
                            </div>
                          )}

                          {(question.type === "rating" || question.type === "scale") && (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Minimum Value</Label>
                                <Input
                                  type="number"
                                  value={question.min}
                                  onChange={(e) =>
                                    updateQuestion(question.id, { min: Number.parseInt(e.target.value) })
                                  }
                                />
                              </div>
                              <div>
                                <Label>Maximum Value</Label>
                                <Input
                                  type="number"
                                  value={question.max}
                                  onChange={(e) =>
                                    updateQuestion(question.id, { max: Number.parseInt(e.target.value) })
                                  }
                                />
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`required-${question.id}`}
                              checked={question.required}
                              onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                            />
                            <Label htmlFor={`required-${question.id}`}>Required question</Label>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reward & Participation Settings</CardTitle>
                    <CardDescription>Configure rewards and participation limits</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="reward">Reward per Response (LSK)</Label>
                        <Input
                          id="reward"
                          type="number"
                          value={survey.rewardAmount == 0 ? "" : survey.rewardAmount}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value == "") {
                              setSurvey((prev) => ({ ...prev, rewardAmount: 0 }));
                            } else {
                              const numValue = Number.parseFloat(value);
                              if (!isNaN(numValue) && numValue >= 0) {
                                setSurvey((prev) => ({ ...prev, rewardAmount: numValue }))
                              }
                            }
                          }}
                          placeholder="Enter reward Amount"
                          min="0"
                          step="0.01"
                        />
                      </div>

                      <div>
                        <Label htmlFor="xp-reward">XP Reward per Response</Label>
                        <Input
                          id="xp-reward"
                          type="number"
                          value={survey.xpReward == 0 ? "" : survey.xpReward}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value == "") {
                              setSurvey((prev) => ({ ...prev, xpReward: 0 }));
                            } else {
                              const numValue = Number.parseFloat(value);
                              if (!isNaN(numValue) && numValue >= 0) {
                                setSurvey((prev) => ({ ...prev, xpReward: numValue }))
                              }
                            }
                          }}
                          placeholder="Enter reward Amount"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="participants">Max Participants</Label>
                      <Input
                        id="participants"
                        type="number"
                        value={survey.maxParticipants === 0 ? "" : survey.maxParticipants}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            setSurvey((prev) => ({ ...prev, maxParticipants: 0 }));
                          } else {
                            const numValue = Number.parseInt(value);
                            if (!isNaN(numValue) && numValue > 0) {
                              setSurvey((prev) => ({ ...prev, maxParticipants: numValue }));
                            }
                          }
                        }}
                        placeholder="Enter max participants"
                        min="1"
                      />
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-medium mb-2">Cost Estimation</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Reward per response:</span>
                          <span>{survey.rewardAmount} LSK</span>
                        </div>
                        <div className="flex justify-between">
                          <span>XP per response:</span>
                          <span>{survey.xpReward} XP</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Max participants:</span>
                          <span>{survey.maxParticipants}</span>
                        </div>
                        <div className="flex justify-between font-medium border-t pt-1">
                          <span>Total LSK cost:</span>
                          <span>{estimatedCost} LSK</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 xl:sticky xl:top-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Survey Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4" />
                    <span>{survey.questions.length} questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{survey.estimatedTime || "Not set"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Coins className="w-4 h-4" />
                    <span>{survey.rewardAmount} LSK reward</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4" />
                    <span>{survey.xpReward} XP reward</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4" />
                    <span>Max {survey.maxParticipants} participants</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant={survey.status === "draft" ? "secondary" : "default"}>
                      {survey.status === "draft" ? "Draft" : "Published"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handlePublish} className="w-full" disabled={survey.status === "published"}>
                  <Send className="w-4 h-4 mr-2" />
                  {survey.status === "published" ? "Published" : "Publish Survey"}
                </Button>
                <Button
                  onClick={handleSaveDraft}
                  className="w-full bg-transparent"
                  variant="outline"
                  disabled={survey.status === "published"}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save as Draft
                </Button>
                {survey.status === "published" && (
                  <p className="text-xs text-gray-500 mt-2 text-center">This survey is already published.</p>
                )}
                {survey.status === "draft" && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Make sure to fund your survey with {estimatedCost} LSK tokens before publishing.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
