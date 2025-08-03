import { SurveyTaking } from "@/components/survey-taking"

type SurveyPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function SurveyPage({ params }: SurveyPageProps) {
  const { id } = await params
  return <SurveyTaking surveyId={id} />
}