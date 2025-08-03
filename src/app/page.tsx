import { redirect } from 'next/navigation'
import HeroSection from '@/components/hero-section'

export default function HomePage() {
  redirect('/home')

  // return (
  //   <>
  //     <HeroSection />
  //   </>
  // )
}
