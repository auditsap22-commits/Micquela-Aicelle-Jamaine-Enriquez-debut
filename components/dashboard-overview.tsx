"use client"

import { Users, Table, Mail, UserPlus, Sparkles, CheckCircle, XCircle, Crown, UserCheck } from "lucide-react"
import { Cinzel } from "next/font/google"
import { cn } from "@/lib/utils"
import { useSiteConfig } from "@/hooks/use-site-config"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

interface DashboardOverviewProps {
  stats: {
    guestGroups: number
    confirmedPax: number
    pendingRSVP: number
    joinRequests: number
    attending?: number
    notAttending?: number
    entourage?: number
    principalSponsors?: number
  }
  debutBrief?: {
    title: string
    content: string
  }
}

interface StatCardProps {
  icon: React.ReactNode
  value: number
  label: string
  iconBgColor: string
  iconColor: string
}

function StatCard({ icon, value, label, iconBgColor, iconColor }: StatCardProps) {
  return (
    <div
      className="rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow duration-200"
      style={{
        backgroundColor: "color-mix(in srgb, white 90%, var(--color-motif-soft))",
        borderColor: "color-mix(in srgb, var(--color-motif-deep) 12%, transparent)",
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
            iconBgColor
          )}
        >
          <div className={iconColor}>{icon}</div>
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`${cinzel.className} text-xs font-semibold uppercase tracking-[0.12em] mb-1`}
            style={{ color: "var(--color-welcome-text-soft)" }}
          >
            {label}
          </p>
          <p
            className={`${cinzel.className} text-3xl font-bold`}
            style={{ color: "var(--color-welcome-navy)" }}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  )
}

export function DashboardOverview({ stats, debutBrief }: DashboardOverviewProps) {
  const siteConfig = useSiteConfig()
  const debutantNickname = siteConfig.couple.debutNickname || siteConfig.couple.debutName

  const defaultBrief = {
    title: `${debutantNickname}'s Debut at a Glance`,
    content: `${stats.confirmedPax} guests confirmed so far, with ${stats.pendingRSVP} invitations still awaiting a response. You have ${stats.guestGroups} guest groups on the list${stats.joinRequests > 0 ? ` and ${stats.joinRequests} pending join request${stats.joinRequests === 1 ? "" : "s"} to review` : ""}. As the debut draws near, every RSVP brings ${debutantNickname}'s celebration one step closer to being complete.`,
  }

  const brief = debutBrief || defaultBrief

  return (
    <div className="space-y-6">
      <div>
        <h1
          className={`${cinzel.className} text-3xl font-semibold tracking-[0.08em] mb-2`}
          style={{ color: "var(--color-welcome-heading)" }}
        >
          Debut Overview
        </h1>
        <p className="font-goudy-italic text-sm" style={{ color: "var(--color-welcome-text-soft)" }}>
          A quick snapshot of {debutantNickname}&apos;s guest list and RSVP progress.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Users className="h-6 w-6" />}
          value={stats.guestGroups}
          label="Guest Groups"
          iconBgColor="bg-motif-yellow/20"
          iconColor="text-motif-deep"
        />
        <StatCard
          icon={<Table className="h-6 w-6" />}
          value={stats.confirmedPax}
          label="Total Guests (Pax)"
          iconBgColor="bg-green-100/80"
          iconColor="text-green-700"
        />
        <StatCard
          icon={<CheckCircle className="h-6 w-6" />}
          value={stats.attending || 0}
          label="Attending"
          iconBgColor="bg-green-100/80"
          iconColor="text-green-700"
        />
        <StatCard
          icon={<XCircle className="h-6 w-6" />}
          value={stats.notAttending || 0}
          label="Not Attending"
          iconBgColor="bg-red-100/80"
          iconColor="text-red-600"
        />
        <StatCard
          icon={<Mail className="h-6 w-6" />}
          value={stats.pendingRSVP}
          label="Pending RSVP"
          iconBgColor="bg-motif-medium/15"
          iconColor="text-motif-medium"
        />
        <StatCard
          icon={<UserPlus className="h-6 w-6" />}
          value={stats.joinRequests}
          label="Join Requests"
          iconBgColor="bg-motif-accent/20"
          iconColor="text-motif-accent"
        />
        <StatCard
          icon={<Crown className="h-6 w-6" />}
          value={stats.entourage || 0}
          label="Entourage"
          iconBgColor="bg-motif-yellow/20"
          iconColor="text-motif-yellow"
        />
        <StatCard
          icon={<UserCheck className="h-6 w-6" />}
          value={stats.principalSponsors || 0}
          label="Principal Sponsors"
          iconBgColor="bg-primary/20"
          iconColor="text-motif-deep"
        />
      </div>

      <div
        className="rounded-2xl p-8 shadow-lg"
        style={{
          background: "linear-gradient(135deg, var(--color-motif-deep), var(--color-motif-medium))",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="h-6 w-6 text-white" />
          <h2 className={`${cinzel.className} text-2xl font-semibold tracking-[0.08em] text-white`}>
            {brief.title}
          </h2>
        </div>
        <div className="font-goudy-italic text-white/90 leading-relaxed whitespace-pre-wrap">
          {brief.content}
        </div>
      </div>
    </div>
  )
}
