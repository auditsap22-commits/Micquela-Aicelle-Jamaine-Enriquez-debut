"use client"

/**
 * Debut Guest Management Dashboard
 *
 * Password-protected panel for managing Jamaine's debut guest list.
 */

import { useState, useEffect } from "react"
import Image from "next/image"
import { Cinzel } from "next/font/google"
import { ImprovedGuestList, Guest } from "@/components/improved-guest-list"
import { Button } from "@/components/ui/button"
import { useSiteConfig } from "@/hooks/use-site-config"
import {
  Lock,
  LogOut,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  X,
  Sparkles,
} from "lucide-react"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const API_URL = process.env.NEXT_PUBLIC_GUEST_API_URL || "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"

export default function ImprovedDashboardPage() {
  const siteConfig = useSiteConfig()
  const debutantName = siteConfig.couple.debutName
  const debutantNickname = siteConfig.couple.debutNickname || debutantName
  const debutDate = siteConfig.ceremony.date

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState<string | null>(null)

  const [guests, setGuests] = useState<Guest[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const DASHBOARD_PASSWORD = "2026"

  useEffect(() => {
    const authStatus = sessionStorage.getItem("dashboardAuth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      fetchGuests()
    }
  }, [])

  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError(null)
        setSuccessMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, successMessage])

  const fetchGuests = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setGuests(Array.isArray(data) ? data : [])
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      console.error("Error fetching guests:", err)
      setError(`Failed to load guests: ${message}`)

      if (API_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
        setError("Please configure your Google Apps Script URL in the API_URL constant")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddGuest = async (guestData: Omit<Guest, "id">) => {
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "create",
          ...guestData,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setSuccessMessage(`${guestData.name} added to ${debutantNickname}'s guest list.`)
      await fetchGuests()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      console.error("Error adding guest:", err)
      setError(`Failed to add guest: ${message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateGuest = async (guest: Guest) => {
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          ...guest,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setSuccessMessage(`${guest.name}'s details have been updated.`)
      await fetchGuests()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      console.error("Error updating guest:", err)
      setError(`Failed to update guest: ${message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteGuest = async (id: string) => {
    const guestToDelete = guests.find((g) => g.id === id)

    if (!confirm(`Remove ${guestToDelete?.name || "this guest"} from ${debutantNickname}'s guest list?`)) {
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "delete",
          id: id,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setSuccessMessage("Guest removed from the debut list.")
      await fetchGuests()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      console.error("Error deleting guest:", err)
      setError(`Failed to delete guest: ${message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === DASHBOARD_PASSWORD) {
      setIsAuthenticated(true)
      setAuthError(null)
      sessionStorage.setItem("dashboardAuth", "true")
      fetchGuests()
    } else {
      setAuthError("Incorrect password. Please try again.")
      setPassword("")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("dashboardAuth")
    setPassword("")
    setGuests([])
  }

  const DebutHeader = ({ compact = false }: { compact?: boolean }) => (
    <div className={`text-center ${compact ? "text-left" : ""}`}>
      {!compact && siteConfig.couple.monogram && (
        <div className="relative mx-auto mb-5 h-28 w-28 sm:h-32 sm:w-32">
          <Image
            src={siteConfig.couple.monogram}
            alt={`${debutantName} monogram`}
            fill
            className="object-contain"
            sizes="128px"
          />
        </div>
      )}

      <p
        className={`beautiful-malera ${compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"} leading-none`}
        style={{ color: "var(--color-welcome-script)" }}
      >
        {debutantNickname}
      </p>

      <h1
        className={`${cinzel.className} mt-2 font-semibold tracking-[0.12em] ${compact ? "text-base sm:text-lg" : "text-lg sm:text-xl"}`}
        style={{ color: "var(--color-welcome-navy)" }}
      >
        {debutantName}
      </h1>

      <p
        className={`font-goudy-italic mt-2 ${compact ? "text-xs sm:text-sm" : "text-sm sm:text-base"}`}
        style={{ color: "var(--color-welcome-text-soft)" }}
      >
        {debutantNickname}&apos;s 18th Birthday Debut · {debutDate}
      </p>

      {!compact && (
        <div className="mt-4 flex items-center justify-center">
          <span
            className="h-px w-16 sm:w-24"
            style={{
              background:
                "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent), transparent)",
            }}
          />
        </div>
      )}
    </div>
  )

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          background:
            "linear-gradient(160deg, var(--color-motif-cream) 0%, var(--color-motif-soft) 45%, color-mix(in srgb, var(--color-motif-silver) 60%, white) 100%)",
        }}
      >
        <div className="w-full max-w-md">
          <div
            className="rounded-2xl p-8 shadow-xl border backdrop-blur-sm"
            style={{
              backgroundColor: "color-mix(in srgb, var(--color-motif-soft) 88%, white)",
              borderColor: "color-mix(in srgb, var(--color-motif-deep) 14%, transparent)",
            }}
          >
            <DebutHeader />

            <div className="mt-8 mb-6 text-center">
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 shadow-md"
                style={{ background: "linear-gradient(135deg, var(--color-motif-deep), var(--color-motif-medium))" }}
              >
                <Lock className="h-7 w-7 text-white" />
              </div>
              <h2
                className={`${cinzel.className} text-xl font-semibold tracking-[0.1em]`}
                style={{ color: "var(--color-welcome-heading)" }}
              >
                Debut Guest Management
              </h2>
              <p
                className="font-goudy-italic mt-2 text-sm"
                style={{ color: "var(--color-welcome-text-soft)" }}
              >
                Enter the password to manage {debutantNickname}&apos;s invitation guest list.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  className={`${cinzel.className} block text-xs font-semibold uppercase tracking-[0.14em] mb-2`}
                  style={{ color: "var(--color-welcome-heading)" }}
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg outline-none transition-all border bg-white/80 focus:ring-2"
                  style={{
                    borderColor: "color-mix(in srgb, var(--color-motif-deep) 18%, transparent)",
                    color: "var(--color-welcome-text)",
                  }}
                  placeholder="Enter password"
                  autoFocus
                />
              </div>

              {authError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <Button
                type="submit"
                className={`${cinzel.className} w-full py-6 rounded-lg font-semibold tracking-[0.08em] transition-all shadow-md hover:shadow-lg text-white border-0`}
                style={{
                  background: "linear-gradient(135deg, var(--color-motif-deep), var(--color-motif-medium))",
                }}
              >
                Enter Dashboard
              </Button>
            </form>

            <div
              className="mt-6 p-4 rounded-lg border flex items-start gap-2"
              style={{
                backgroundColor: "color-mix(in srgb, var(--color-motif-yellow) 12%, white)",
                borderColor: "color-mix(in srgb, var(--color-motif-yellow) 35%, transparent)",
              }}
            >
              <Sparkles className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--color-motif-yellow)" }} />
              <p className="font-goudy-italic text-xs" style={{ color: "var(--color-welcome-text)" }}>
                Track RSVPs, companions, VIP guests, and table assignments for {debutantNickname}&apos;s debut celebration.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(160deg, var(--color-motif-cream) 0%, var(--color-motif-soft) 50%, color-mix(in srgb, var(--color-motif-silver) 50%, white) 100%)",
      }}
    >
      <div
        className="sticky top-0 z-20 shadow-sm border-b backdrop-blur-md"
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-motif-soft) 92%, white)",
          borderColor: "color-mix(in srgb, var(--color-motif-deep) 12%, transparent)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <DebutHeader compact />
              <p
                className={`${cinzel.className} mt-3 text-xs font-semibold uppercase tracking-[0.16em]`}
                style={{ color: "var(--color-welcome-heading)" }}
              >
                Guest Management Panel
              </p>
              <p
                className="font-goudy-italic mt-1 text-sm"
                style={{ color: "var(--color-welcome-text-soft)" }}
              >
                Manage invitations, RSVPs, and seating for the debut celebration.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Button
                onClick={fetchGuests}
                disabled={isLoading}
                size="sm"
                variant="outline"
                className="border-motif-silver hover:border-motif-deep hover:text-motif-deep"
                style={{ color: "var(--color-welcome-text-soft)" }}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button
                onClick={handleLogout}
                size="sm"
                variant="outline"
                className="border-motif-silver hover:text-red-600 hover:border-red-300"
                style={{ color: "var(--color-welcome-text-soft)" }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {successMessage && (
          <div className="mb-6 flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 animate-in slide-in-from-top-2">
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <span className="flex-1 font-goudy-italic">{successMessage}</span>
            <button onClick={() => setSuccessMessage(null)} className="hover:opacity-70">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 animate-in slide-in-from-top-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span className="flex-1">{error}</span>
            <button onClick={() => setError(null)} className="hover:opacity-70">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {API_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE" && (
          <div
            className="mb-6 p-6 border-2 rounded-xl"
            style={{
              backgroundColor: "color-mix(in srgb, var(--color-motif-yellow) 10%, white)",
              borderColor: "color-mix(in srgb, var(--color-motif-yellow) 45%, transparent)",
            }}
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: "var(--color-motif-medium)" }} />
              <div>
                <h3
                  className={`${cinzel.className} font-bold mb-2`}
                  style={{ color: "var(--color-welcome-heading)" }}
                >
                  Configuration Required
                </h3>
                <p className="font-goudy-italic text-sm mb-3" style={{ color: "var(--color-welcome-text)" }}>
                  Please update the <code className="px-2 py-1 rounded text-xs bg-motif-silver">API_URL</code> constant
                  with your Google Apps Script Web App URL.
                </p>
                <ol
                  className="font-goudy-italic text-sm space-y-1 ml-4 list-decimal"
                  style={{ color: "var(--color-welcome-text-soft)" }}
                >
                  <li>Deploy the Google Apps Script (see GUEST_MANAGEMENT_SETUP.md)</li>
                  <li>Copy the Web App URL from the deployment</li>
                  <li>Replace the API_URL in this file</li>
                  <li>Refresh the page</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        <div
          className="rounded-2xl shadow-lg border p-6"
          style={{
            backgroundColor: "color-mix(in srgb, white 88%, var(--color-motif-soft))",
            borderColor: "color-mix(in srgb, var(--color-motif-deep) 14%, transparent)",
          }}
        >
          {isLoading && guests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <RefreshCw className="h-12 w-12 text-motif-deep animate-spin mb-4" />
              <p className="font-goudy-italic" style={{ color: "var(--color-welcome-text-soft)" }}>
                Loading {debutantNickname}&apos;s guest list...
              </p>
            </div>
          ) : (
            <ImprovedGuestList
              guests={guests}
              onAddGuest={handleAddGuest}
              onUpdateGuest={handleUpdateGuest}
              onDeleteGuest={handleDeleteGuest}
            />
          )}
        </div>
      </div>
    </div>
  )
}
