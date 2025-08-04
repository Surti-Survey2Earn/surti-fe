import { Suspense } from "react"
import { SurveyBuilder } from "@/components/survey-builder"

function SurveyBuilderLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Loading survey builder...</p>
      </div>
    </div>
  )
}

// Client component wrapper
function SurveyBuilderWrapper() {
  return (
    <Suspense fallback={<SurveyBuilderLoading />}>
      <SurveyBuilder />
    </Suspense>
  )
}

export default function CreateSurveyPage() {
  return <SurveyBuilderWrapper />

}