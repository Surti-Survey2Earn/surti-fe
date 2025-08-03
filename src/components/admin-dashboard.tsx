"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart3,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Filter,
  TrendingUp,
  Shield,
  Coins,
} from "lucide-react"
import { formatNumberClientOnly } from "@/lib/format-client-only" // Import the new helper

// Mock data
const mockStats = {
  totalUsers: 12450,
  activeSurveys: 89,
  pendingReviews: 23,
  flaggedResponses: 7,
  totalRewards: 245000,
  platformFees: 12250,
}

const mockSurveys = [
  {
    id: 1,
    title: "DeFi User Experience Research",
    creator: "0x1234...5678",
    status: "active",
    participants: 234,
    maxParticipants: 500,
    reward: 50,
    created: "2024-01-15",
    flagged: false,
  },
  {
    id: 2,
    title: "NFT Market Sentiment Analysis",
    creator: "0x5678...9012",
    status: "pending",
    participants: 0,
    maxParticipants: 300,
    reward: 75,
    created: "2024-01-16",
    flagged: true,
  },
  {
    id: 3,
    title: "Web3 Gaming Preferences",
    creator: "0x9012...3456",
    status: "completed",
    participants: 500,
    maxParticipants: 500,
    reward: 100,
    created: "2024-01-10",
    flagged: false,
  },
]

const mockUsers = [
  {
    address: "0x1234...5678",
    level: 5,
    reputation: 4.8,
    surveysCompleted: 23,
    totalEarnings: 1250,
    status: "verified",
    joinDate: "2024-01-01",
    flagged: false,
  },
  {
    address: "0x5678...9012",
    level: 3,
    reputation: 3.2,
    surveysCompleted: 8,
    totalEarnings: 420,
    status: "pending",
    joinDate: "2024-01-10",
    flagged: true,
  },
  {
    address: "0x9012...3456",
    level: 7,
    reputation: 4.9,
    surveysCompleted: 45,
    totalEarnings: 3200,
    status: "verified",
    joinDate: "2023-12-15",
    flagged: false,
  },
]

const mockFlaggedContent = [
  {
    id: 1,
    type: "survey",
    title: "Suspicious Survey Title",
    reporter: "0x1111...2222",
    reason: "Inappropriate content",
    date: "2024-01-16",
    status: "pending",
  },
  {
    id: 2,
    type: "response",
    title: "Survey Response #1234",
    reporter: "system",
    reason: "Bot-like behavior detected",
    date: "2024-01-16",
    status: "pending",
  },
]

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Administrator
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="surveys" className="text-xs sm:text-sm">
              Surveys
            </TabsTrigger>
            <TabsTrigger value="users" className="text-xs sm:text-sm">
              Users
            </TabsTrigger>
            <TabsTrigger value="moderation" className="text-xs sm:text-sm">
              Moderation
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs sm:text-sm">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatNumberClientOnly(mockStats.totalUsers)}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Surveys</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.activeSurveys}</div>
                  <p className="text-xs text-muted-foreground">{mockStats.pendingReviews} pending review</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
                  <Coins className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatNumberClientOnly(mockStats.totalRewards)} S2E</div>
                  <p className="text-xs text-muted-foreground">
                    {formatNumberClientOnly(mockStats.platformFees)} S2E in fees
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Flagged Content</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.flaggedResponses}</div>
                  <p className="text-xs text-muted-foreground">Requires immediate attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Platform Growth</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+24%</div>
                  <p className="text-xs text-muted-foreground">Monthly active users</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Health</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Healthy</div>
                  <p className="text-xs text-muted-foreground">All systems operational</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform activities requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      <div>
                        <h4 className="font-medium">Survey flagged for review</h4>
                        <p className="text-sm text-muted-foreground">NFT Market Sentiment Analysis</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">New user verification pending</h4>
                        <p className="text-sm text-muted-foreground">0x5678...9012</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Verify
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <h4 className="font-medium">Survey completed successfully</h4>
                        <p className="text-sm text-muted-foreground">Web3 Gaming Preferences - 500 responses</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="surveys" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-lg sm:text-xl font-semibold">Survey Management</h2>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search surveys..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-auto"
                  />
                </div>
                <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Survey</TableHead>
                      <TableHead className="min-w-[120px]">Creator</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Reward</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSurveys.map((survey) => (
                      <TableRow key={survey.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-sm sm:text-base">{survey.title}</div>
                            {survey.flagged && (
                              <Badge variant="destructive" className="mt-1">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Flagged
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs sm:text-sm">{survey.creator}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              survey.status === "active"
                                ? "default"
                                : survey.status === "pending"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {survey.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {survey.participants}/{survey.maxParticipants}
                        </TableCell>
                        <TableCell className="text-sm">{survey.reward} S2E</TableCell>
                        <TableCell className="text-sm">{survey.created}</TableCell>
                        <TableCell>
                          <div className="flex gap-1 sm:gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {survey.status === "pending" && (
                              <>
                                <Button size="sm" variant="outline">
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">User Management</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search users..." className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Address</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Reputation</TableHead>
                    <TableHead>Surveys</TableHead>
                    <TableHead>Earnings</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <div className="font-mono text-sm">{user.address}</div>
                          {user.flagged && (
                            <Badge variant="destructive" className="mt-1">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Flagged
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{user.level}</TableCell>
                      <TableCell>{user.reputation}/5.0</TableCell>
                      <TableCell>{user.surveysCompleted}</TableCell>
                      <TableCell>{user.totalEarnings} S2E</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.status === "verified" ? "default" : user.status === "pending" ? "secondary" : "outline"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {user.status === "pending" && (
                            <>
                              <Button size="sm" variant="outline">
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Content Moderation</h2>
              <Badge variant="destructive">{mockFlaggedContent.length} items need review</Badge>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Flagged Content</CardTitle>
                <CardDescription>Content that has been reported or automatically flagged</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFlaggedContent.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.type} • Reported by {item.reporter} • {item.reason}
                          </p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                        <Button size="sm" variant="outline">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-xl font-semibold">Platform Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    User Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>New users this month</span>
                      <span className="font-medium">{formatNumberClientOnly(1245)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active users</span>
                      <span className="font-medium">{formatNumberClientOnly(8932)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Retention rate</span>
                      <span className="font-medium">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Survey Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Surveys created this month</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average completion rate</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average response quality</span>
                      <span className="font-medium">4.2/5.0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Token Economics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total tokens distributed</span>
                      <span className="font-medium">{formatNumberClientOnly(245000)} S2E</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform fees collected</span>
                      <span className="font-medium">{formatNumberClientOnly(12250)} S2E</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average reward per survey</span>
                      <span className="font-medium">67 S2E</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quality Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Flagged content rate</span>
                      <span className="font-medium">2.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bot detection accuracy</span>
                      <span className="font-medium">94%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>User satisfaction</span>
                      <span className="font-medium">4.6/5.0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
