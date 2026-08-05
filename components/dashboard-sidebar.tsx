"use client"

import {
  Users,
  MessageSquare,
  Crown,
  LayoutDashboard,
  ExternalLink,
  UserPlus,
  Heart,
  RefreshCw,
} from "lucide-react"
import { Cinzel } from "next/font/google"
import { cn } from "@/lib/utils"
import { useSiteConfig } from "@/hooks/use-site-config"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

interface DashboardSidebarProps {
  activeTab: "dashboard" | "guests" | "requests" | "messages" | "entourage" | "proposals"
  onTabChange: (tab: "dashboard" | "guests" | "requests" | "messages" | "entourage" | "proposals") => void
  guestRequestCount: number
  messageCount: number
}

export function DashboardSidebar({
  activeTab,
  onTabChange,
  guestRequestCount,
  messageCount,
}: DashboardSidebarProps) {
  const siteConfig = useSiteConfig()
  const debutantNickname = siteConfig.couple.debutNickname || siteConfig.couple.debutName
  const navItems = [
    {
      id: "dashboard" as const,
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "guests" as const,
      label: "Guest List",
      icon: Users,
      badge: null,
    },
    {
      id: "requests" as const,
      label: "Join Requests",
      icon: UserPlus,
      badge: guestRequestCount,
    },
    {
      id: "messages" as const,
      label: "Guest Messages",
      icon: MessageSquare,
      badge: messageCount,
    },
    {
      id: "entourage" as const,
      label: "Entourage & Sponsors",
      icon: Crown,
      badge: null,
    },
    {
      id: "proposals" as const,
      label: "Proposal Invites",
      icon: Heart,
      badge: null,
    },
  ]

  return (
    <div
      className="w-64 h-screen sticky top-0 flex flex-col border-r"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-motif-soft) 94%, white)",
        borderColor: "color-mix(in srgb, var(--color-motif-deep) 12%, transparent)",
      }}
    >
      {/* Logo/Header */}
      <div
        className="p-6 border-b"
        style={{ borderColor: "color-mix(in srgb, var(--color-motif-deep) 12%, transparent)" }}
      >
        <p
          className="beautiful-malera text-2xl leading-none mb-1"
          style={{ color: "var(--color-welcome-script)" }}
        >
          {debutantNickname}
        </p>
        <span
          className={`${cinzel.className} text-sm font-semibold tracking-[0.1em]`}
          style={{ color: "var(--color-welcome-navy)" }}
        >
          Debut Invitation
        </span>
        <p
          className={`${cinzel.className} text-[10px] uppercase tracking-[0.16em] mt-2`}
          style={{ color: "var(--color-welcome-text-soft)" }}
        >
          Dashboard Panel
        </p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                isActive
                  ? "shadow-sm text-motif-deep"
                  : "hover:text-motif-deep"
              )}
              style={
                isActive
                  ? { backgroundColor: "color-mix(in srgb, var(--color-motif-yellow) 14%, white)" }
                  : { color: "var(--color-welcome-text-soft)" }
              }
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-motif-medium" : "text-motif-accent group-hover:text-motif-medium"
                )}
              />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge !== null && item.badge > 0 && (
                <span className={cn(
                  "px-2 py-0.5 text-xs font-bold rounded-full min-w-[20px] text-center",
                  item.id === "requests" ? "bg-[#EDE9FE] text-[#6B21A8]" : "bg-[#FEF3C7] text-[#92400E]"
                )}>
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Sync Button */}
      <div className="p-4 border-t border-[#E5E7EB]">
        <a
          href={siteConfig.googleAPI.googleShare}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-[#6B7280] hover:text-[#6B4423] hover:bg-[#F9FAFB] border border-[#E5E7EB] transition-all duration-200 justify-start"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Sync Spreadsheet</span>
          <ExternalLink className="h-3 w-3 ml-auto" />
        </a>
      </div>
    </div>
  )
}

