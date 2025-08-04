"use client"

import { useState, useEffect, useRef } from "react" // Added useRef
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "src/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Clock, Coins, Star, ChevronLeft, ChevronRight, Award, CheckCircle } from "lucide-react"

interface SurveyTakingProps {
  surveyId: string
}

// Mock survey data
const mockSurvey = {
  id: 1,
  title: "DeFi User Experience Research",
  description: "Help us understand how users interact with DeFi protocols and what improvements they need.",
  category: "DeFi",
  reward: 50,
  xpReward: 150, // Added XP reward to mock survey
  timeEstimate: "5-10 min", // Example: "5-10 min", "15+ min"
  participants: 234,
  maxParticipants: 500,
  creator: "0x1234...5678",
  questions: [
    {
      id: "1",
      type: "single-choice",
      title: "How often do you use DeFi protocols?",
      description: "Select the option that best describes your usage frequency",
      required: true,
      options: ["Daily", "Weekly", "Monthly", "Rarely", "Never"],
    },
    {
      id: "2",
      type: "multiple-choice",
      title: "Which DeFi protocols have you used? (Select all that apply)",
      required: true,
      options: ["Uniswap", "Aave", "Compound", "MakerDAO", "Curve", "SushiSwap", "Other"],
    },
    {
      id: "3",
      type: "rating",
      title: "How would you rate the overall user experience of DeFi protocols?",
      required: true,
      min: 1,
      max: 5,
    },
    {
      id: "4",
      type: "text",
      title: "What is the biggest challenge you face when using DeFi protocols?",
      description: "Please provide specific examples if possible",
      required: true,
    },
    {
      id: "5",
      type: "scale",
      title: "How likely are you to recommend DeFi to a friend?",
      description: "Scale from 1 (not likely) to 10 (very likely)",
      required: true,
      min: 1,
      max: 10,
    },
  ],
}

export function SurveyTaking({ surveyId }: SurveyTakingProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(null) // Time left in seconds
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const survey = mockSurvey // In real app, fetch based on surveyId

  // Parse estimatedTime into seconds
  useEffect(() => {
    if (survey.timeEstimate) {
      const timeParts = survey.timeEstimate.match(/(\d+)-(\d+)\smin/)
      if (timeParts && timeParts[2]) {
        setTimeLeft(Number.parseInt(timeParts[2]) * 60) // Use the upper bound in minutes
      } else if (survey.timeEstimate.includes("15+ min")) {
        setTimeLeft(20 * 60) // Set a default for "15+ min"
      } else {
        // Fallback for single number like "5 min"
        const singleTime = survey.timeEstimate.match(/(\d+)\smin/)
        if (singleTime && singleTime[1]) {
          setTimeLeft(Number.parseInt(singleTime[1]) * 60)
        }
      }
    }
  }, [survey.timeEstimate])

  // Start and manage the timer
  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0 && !isCompleted && !isSubmitting) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === null || prevTime <= 1) {
            clearInterval(timerRef.current!)
            handleSubmit(true) // Submit automatically when time runs out
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    } else if (timeLeft === 0) {
      clearInterval(timerRef.current!)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [timeLeft, isCompleted, isSubmitting]) // Added isSubmitting to dependencies

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "N/A"
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const question = survey.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / survey.questions.length) * 100

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleNext = () => {
    if (question.required && !answers[question.id]) {
      toast({
        title: "Answer Required",
        description: "Please answer this question before continuing.",
        variant: "destructive",
      })
      return
    }

    if (currentQuestion < survey.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      handleSubmit(false) // Manual submission
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = async (timedOut: boolean) => {
    if (isSubmitting || isCompleted) return // Prevent multiple submissions

    setIsSubmitting(true)
    if (timerRef.current) {
      clearInterval(timerRef.current) // Stop the timer immediately
    }

    // Mock submission delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsCompleted(true)

    if (timedOut) {
      toast({
        title: "Time's Up!",
        description: `Your survey was automatically submitted. You've earned ${survey.reward} S2E tokens and ${survey.xpReward} XP.`,
      })
    } else {
      toast({
        title: "Survey Completed!",
        description: `You've earned ${survey.reward} S2E tokens and ${survey.xpReward} XP.`,
      })
    }
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Survey Completed!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for your valuable feedback. Your rewards have been processed.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-green-600" />
                  <span>Token Reward</span>
                </div>
                <span className="font-bold text-green-600">{survey.reward} S2E</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-600" />
                  <span>XP Reward</span>
                </div>
                <span className="font-bold text-purple-600">{survey.xpReward} XP</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span>NFT Certificate</span>
                </div>
                <Badge variant="outline">Minted</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Button onClick={() => router.push("/dashboard")} className="w-full">
                Go to Dashboard
              </Button>
              <Button onClick={() => router.push("/surveys")} variant="outline" className="w-full">
                Take Another Survey
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/surveys")}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Surveys
              </Button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold">{survey.title}</h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {survey.timeEstimate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Coins className="w-4 h-4" />
                    {survey.reward} LSK
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {survey.xpReward} XP
                  </span>
                  <Badge variant="outline">{survey.category}</Badge>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 self-start sm:self-auto">
              Question {currentQuestion + 1} of {survey.questions.length}
              {timeLeft !== null && (
                <span className="ml-4 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Time Left: {formatTime(timeLeft)}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} />
          </div>

          {/* Question Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">Question {currentQuestion + 1}</Badge>
                {question.required && <Badge variant="destructive">Required</Badge>}
              </div>
              <CardTitle className="text-xl">{question.title}</CardTitle>
              {question.description && <CardDescription>{question.description}</CardDescription>}
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Question Input */}
              {question.type === "text" && (
                <Textarea
                  value={answers[question.id] || ""}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  placeholder="Enter your answer..."
                  rows={4}
                  disabled={isSubmitting || timeLeft === 0} // Disable if submitting or time is out
                />
              )}

              {question.type === "single-choice" && (
                <RadioGroup
                  value={answers[question.id] || ""}
                  onValueChange={(value) => handleAnswer(question.id, value)}
                  disabled={isSubmitting || timeLeft === 0} // Disable if submitting or time is out
                >
                  {question.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.type === "multiple-choice" && (
                <div className="space-y-3">
                  {question.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`option-${index}`}
                        checked={(answers[question.id] || []).includes(option)}
                        onCheckedChange={(checked) => {
                          const currentAnswers = answers[question.id] || []
                          if (checked) {
                            handleAnswer(question.id, [...currentAnswers, option])
                          } else {
                            handleAnswer(
                              question.id,
                              currentAnswers.filter((a: string) => a !== option),
                            )
                          }
                        }}
                        disabled={isSubmitting || timeLeft === 0} // Disable if submitting or time is out
                      />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </div>
              )}

              {question.type === "rating" && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: question.max || 5 }, (_, i) => i + 1).map((rating) => (
                      <Button
                        key={rating}
                        variant={answers[question.id] === rating ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleAnswer(question.id, rating)}
                        className="w-10 h-10 sm:w-12 sm:h-12"
                        disabled={isSubmitting || timeLeft === 0} // Disable if submitting or time is out
                      >
                        <Star
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${answers[question.id] === rating ? "fill-current" : ""}`}
                        />
                      </Button>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {answers[question.id] ? `${answers[question.id]}/${question.max}` : "Select rating"}
                  </span>
                </div>
              )}

              {question.type === "scale" && (
                <div className="space-y-4">
                  <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                    <span>{question.min} - Not likely</span>
                    <span>{question.max} - Very likely</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {Array.from(
                      { length: (question.max || 10) - (question.min || 1) + 1 },
                      (_, i) => (question.min || 1) + i,
                    ).map((value) => (
                      <Button
                        key={value}
                        variant={answers[question.id] === value ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleAnswer(question.id, value)}
                        className="w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm"
                        disabled={isSubmitting || timeLeft === 0} // Disable if submitting or time is out
                      >
                        {value}
                      </Button>
                    ))}
                  </div>
                  {answers[question.id] && (
                    <p className="text-sm text-center text-gray-600">Selected: {answers[question.id]}</p>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0 || isSubmitting || timeLeft === 0}
                  className="w-full sm:w-auto bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>

                <Button onClick={handleNext} disabled={isSubmitting || timeLeft === 0} className="w-full sm:w-auto">
                  {isSubmitting ? (
                    "Submitting..."
                  ) : currentQuestion === survey.questions.length - 1 ? (
                    "Submit Survey"
                  ) : (
                    <>
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
