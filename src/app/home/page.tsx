"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ConnectButton } from "@/components/connect-button"
import { MobileNav } from "@/components/mobile-nav"
import { useRouter } from "next/navigation"
import { HeroHeader } from "../../components/header"
import {
    Coins,
    Shield,
    Trophy,
    BarChart3,
    Globe,
    Zap,
    Star,
    ArrowRight,
    Users,
    Wallet,
    FileText,
    Plus,
} from "lucide-react"
import { useAccount } from "wagmi" // Import useAccount from providers
import HeroSection from "@/components/hero-section"
import HowItWorks from "@/components/how-it-works"

export default function Home() {

    const features = [
        {
            icon: Coins,
            title: "Earn Tokens",
            description: "Get rewarded with ERC-20 tokens for completing surveys",
        },
        {
            icon: Shield,
            title: "Anti-Sybil Protection",
            description: "Advanced wallet verification and staking mechanisms",
        },
        {
            icon: Trophy,
            title: "Reputation System",
            description: "Build your reputation and unlock higher rewards",
        },
        {
            icon: BarChart3,
            title: "Real-time Analytics",
            description: "Comprehensive insights for survey creators",
        },
        {
            icon: Globe,
            title: "Multi-language",
            description: "Support for global communities",
        },
        {
            icon: Star,
            title: "NFT Certificates",
            description: "Mint proof of participation NFTs",
        },
    ]

    const stats = [
        { label: "Active Users", value: "12,450+" },
        { label: "Surveys Completed", value: "89,230+" },
        { label: "Tokens Distributed", value: "2.4M+" },
        { label: "Projects Served", value: "340+" },
    ]

    return (
        <>
            <HeroSection />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Header */}
                {/* <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
                    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <MobileNav />
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">Survey2Earn</span>
                        </div>
                        <ConnectButton />
                    </div>
                </header> */}
                {/* <HeroHeader /> */}

                {/* Hero Section */}


                {/* Stats Section */}
                <section className="py-16 px-4 bg-white/50 dark:bg-gray-800/50">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 id="whyChoose" className="text-3xl md:text-4xl font-bold mb-4">Why Choose Survey2Earn?</h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Built for the Web3 community with advanced features to ensure quality and fairness
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {features.map((feature, index) => (
                                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                                    <CardHeader>
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                                            <feature.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <CardTitle>{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base">{feature.description}</CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <HowItWorks />

                {/* Footer */}
                <footer className="py-12 px-4 bg-gray-900 text-white">
                    <div className="container mx-auto text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">Survey2Earn</span>
                        </div>
                        <p className="text-gray-400">© 2024 Survey2Earn. Built on Web3 for the community.</p>
                    </div>
                </footer>
            </div>
        </>
    )
}