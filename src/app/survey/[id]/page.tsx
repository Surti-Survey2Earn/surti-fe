import { SurveyTaking } from "@/components/survey-taking"

type SurveyPageProps = {
  params: {
    id: string
  }
}

export default function SurveyPage({ params }: SurveyPageProps) {
  return <SurveyTaking surveyId={params.id} />
}
