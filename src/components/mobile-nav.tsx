"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { Menu, Home, FileText, Plus, BarChart3, Settings, Zap, ListChecks } from "lucide-react"
import { useAccount } from "wagmi" // Import directly from wagmi

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { isConnected } = useAccount() // Use isConnected from wagmi

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", requiresAuth: true },
    { icon: FileText, label: "Surveys", href: "/surveys", requiresAuth: false },
    { icon: ListChecks, label: "My Surveys", href: "/my-surveys", requiresAuth: true },
    { icon: Plus, label: "Create Survey", href: "/create-survey", requiresAuth: true },
    { icon: BarChart3, label: "Analytics", href: "/analytics", requiresAuth: true },
    { icon: Settings, label: "Admin", href: "/admin", requiresAuth: true },
  ]

  const handleNavigation = (href: string) => {
    router.push(href)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">Survey2Earn</span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            if (item.requiresAuth && !isConnected) return null

            return (
              <Button
                key={item.href}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleNavigation(item.href)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            )
          })}
        </nav>

        {!isConnected && (
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">Connect your wallet to access all features</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}