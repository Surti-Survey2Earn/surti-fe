import { SurveyTaking } from "@/components/survey-taking"

export default function SurveyPage({ params }: { params: { id: string } }) {
  return <SurveyTaking surveyId={params.id} />
}
