"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ConnectButton } from "@/components/connect-button"
import { MobileNav } from "@/components/mobile-nav"
import { useRouter } from "next/navigation"
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

export default function LandingPage() {
  const { isConnected } = useAccount() // Use isConnected from wagmi
  const router = useRouter()

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
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
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            🚀 Web3 Survey Platform
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Earn While You Share
            <br />
            Your Opinion
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto px-4">
            Join the first Web3 survey platform where your insights are rewarded with tokens. Help projects grow while
            building your reputation on-chain.
          </p>

          {isConnected ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button
                size="lg"
                onClick={() => router.push("/dashboard")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full sm:w-auto"
              >
                Go to Dashboard <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push("/surveys")} className="w-full sm:w-auto">
                Browse Surveys
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 px-4">
              <ConnectButton />
              <p className="text-sm text-gray-500 text-center">Connect your wallet to get started</p>
            </div>
          )}
        </div>
      </section>

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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Survey2Earn?</h2>
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
      <section className="py-20 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Simple steps to start earning tokens through surveys on the blockchain
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            {/* For Survey Participants */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold">For Survey Participants</h3>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Connect Your Wallet</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Connect your Web3 wallet (MetaMask, WalletConnect, etc.) to get started on the platform.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Browse Available Surveys</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Explore surveys from various categories like DeFi, NFTs, Gaming, and more. Filter by reward amount
                      and time required.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Complete Surveys</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Answer questions honestly and provide valuable insights. Our anti-sybil system ensures fair
                      participation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Earn Rewards</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Receive S2E tokens and NFT certificates instantly upon completion. Build your reputation for
                      higher rewards.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual representation */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Wallet Connected</div>
                      <div className="text-sm text-gray-500">0x1234...5678</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Survey Completed</div>
                      <div className="text-sm text-gray-500">DeFi User Experience</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Coins className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Rewards Earned</div>
                      <div className="text-sm text-gray-500">50 S2E + NFT Certificate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* For Survey Creators */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual representation */}
            <div className="relative order-2 lg:order-1">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Survey Created</div>
                      <div className="text-sm text-gray-500">NFT Market Analysis</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                      <Coins className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Tokens Deposited</div>
                      <div className="text-sm text-gray-500">5,000 S2E for rewards</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Results Ready</div>
                      <div className="text-sm text-gray-500">100 responses collected</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold">For Survey Creators</h3>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Create Your Survey</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Use our intuitive survey builder to create questions, set categories, and define your target
                      audience.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Set Rewards & Fund</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Determine reward amounts per response and deposit S2E tokens to fund your survey campaign.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Launch & Monitor</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Publish your survey and track responses in real-time with our comprehensive analytics dashboard.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-600">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Get Insights</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Access detailed analytics, export data, and gain valuable insights from high-quality responses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-center mb-12">What Makes Us Different</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold mb-2">Anti-Sybil Protection</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Advanced algorithms prevent fake responses and ensure data quality
                </p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">Instant Rewards</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Automatic token distribution upon survey completion via smart contracts
                </p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold mb-2">Reputation System</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Build your on-chain reputation to unlock higher-paying surveys
                </p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold mb-2">NFT Certificates</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Mint unique NFTs as proof of participation in surveys
                </p>
              </div>
            </div>
          </div>

          {/* Process Flow Diagram */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-center mb-12">Survey Lifecycle</h3>
            <div className="relative">
              {/* Desktop Flow */}
              <div className="hidden lg:flex items-center justify-between">
                <div className="flex flex-col items-center text-center max-w-xs">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Survey Creation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Creator builds survey with questions and sets reward parameters
                  </p>
                </div>

                <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-4"></div>

                <div className="flex flex-col items-center text-center max-w-xs">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-4">
                    <Coins className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Token Deposit</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Smart contract holds tokens for automatic reward distribution
                  </p>
                </div>

                <div className="flex-1 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 mx-4"></div>

                <div className="flex flex-col items-center text-center max-w-xs">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-red-600 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">User Participation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Verified users complete surveys and provide quality responses
                  </p>
                </div>

                <div className="flex-1 h-0.5 bg-gradient-to-r from-pink-600 to-red-600 mx-4"></div>

                <div className="flex flex-col items-center text-center max-w-xs">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Results & Analytics</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Creator receives insights while users earn tokens and NFTs
                  </p>
                </div>
              </div>

              {/* Mobile Flow */}
              <div className="lg:hidden space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Survey Creation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Creator builds survey with questions and sets reward parameters
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Coins className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Token Deposit</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Smart contract holds tokens for automatic reward distribution
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">User Participation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Verified users complete surveys and provide quality responses
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Results & Analytics</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Creator receives insights while users earn tokens and NFTs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of users already earning tokens through surveys</p>
          {!isConnected && <ConnectButton />}
        </div>
      </section>

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
  )
}