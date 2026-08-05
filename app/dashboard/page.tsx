"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Cinzel } from "next/font/google"
import { Button } from "@/components/ui/button"
import {
  Lock,
  CheckCircle,
  RefreshCw,
  AlertCircle,
  LogOut,
  X,
} from "lucide-react"
import { useSiteConfig } from "@/hooks/use-site-config"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardOverview } from "@/components/dashboard-overview"
import { ImprovedGuestList, Guest } from "@/components/improved-guest-list"
import { GuestRequests } from "@/components/guest-requests"
import { GuestMessages } from "@/components/guest-messages"
import { type Message } from "@/app/api/messages/route"
import { EntourageSponsors } from "@/components/entourage-sponsors"
import { ProposalDashboard } from "@/components/proposal-dashboard"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

interface GuestRequest {
  Name: string
  Email: string
  Phone: string
  RSVP: string
  Guest: string
  Message: string
}

interface Entourage {
  Name: string
  RoleCategory: string
  RoleTitle: string
  Email: string
}

interface PrincipalSponsor {
  MalePrincipalSponsor: string
  FemalePrincipalSponsor: string
}

export default function DashboardPage() {
  const siteConfig = useSiteConfig()
  const debutantName = siteConfig.couple.debutName
  const debutantNickname = siteConfig.couple.debutNickname || debutantName
  const debutDate = siteConfig.ceremony.date
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [guests, setGuests] = useState<Guest[]>([])
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"dashboard" | "guests" | "requests" | "messages" | "entourage" | "proposals">("dashboard")
  
  // Guest Request state
  const [guestRequests, setGuestRequests] = useState<GuestRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<GuestRequest[]>([])

  // Entourage state
  const [entourage, setEntourage] = useState<Entourage[]>([])
  const [filteredEntourage, setFilteredEntourage] = useState<Entourage[]>([])

  // PrincipalSponsor state
  const [principalSponsors, setPrincipalSponsors] = useState<PrincipalSponsor[]>([])
  const [filteredPrincipalSponsors, setFilteredPrincipalSponsors] = useState<PrincipalSponsor[]>([])

  // Guest messages state (from Messages Google Sheet via /api/messages)
  const [messages, setMessages] = useState<Message[]>([])
  const [isMessagesLoading, setIsMessagesLoading] = useState(false)

  // Password - you can change this!
  const DASHBOARD_PASSWORD = "2026" // Change this to your preferred password

  // Check if already authenticated
  useEffect(() => {
    const authStatus = sessionStorage.getItem("dashboardAuth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      fetchGuests()
      fetchGuestRequests()
      fetchEntourage()
      fetchPrincipalSponsors()
      fetchMessages()
    }
  }, [])

  const fetchGuests = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/guests")
      if (!response.ok) {
        throw new Error("Failed to fetch guests")
      }
      const data = await response.json()
      
      // Handle error response
      if (data.error) {
        throw new Error(data.error)
      }
      
      setGuests(Array.isArray(data) ? data : [])
      setFilteredGuests(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching guests:", error)
      setError("Failed to load guest list")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMessages = async () => {
    setIsMessagesLoading(true)
    try {
      const response = await fetch("/api/messages", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch messages")
      }

      const data = await response.json()

      if (!Array.isArray(data)) {
        console.warn("Unexpected messages response; expected an array", data)
        setMessages([])
        return
      }

      const parsed = data
        .filter((m: Message) => m.name || m.message || m.timestamp)
        .reverse()

      setMessages(parsed)
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setIsMessagesLoading(false)
    }
  }

  const fetchGuestRequests = async () => {
    setIsLoading(true)
    try {
      // Fetch from guest-requests API with cache busting
      const response = await fetch("/api/guest-requests", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error("Failed to fetch guest requests:", errorText)
        throw new Error("Failed to fetch guest requests")
      }
      
      const data = await response.json()
      console.log("Guest requests fetched:", data)
      
      setGuestRequests(Array.isArray(data) ? data : [])
      setFilteredRequests(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching guest requests:", error)
      setError("Failed to load guest requests. Please check your connection.")
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchEntourage = async () => {
    try {
      const response = await fetch("/api/entourage")
      if (!response.ok) {
        throw new Error("Failed to fetch entourage")
      }
      const data = await response.json()
      setEntourage(data)
      setFilteredEntourage(data)
    } catch (error) {
      console.error("Error fetching entourage:", error)
    }
  }

  const fetchPrincipalSponsors = async () => {
    try {
      const response = await fetch("/api/principal-sponsor")
      if (!response.ok) {
        throw new Error("Failed to fetch principal sponsors")
      }
      const data = await response.json()
      setPrincipalSponsors(data)
      setFilteredPrincipalSponsors(data)
    } catch (error) {
      console.error("Error fetching principal sponsors:", error)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === DASHBOARD_PASSWORD) {
      setIsAuthenticated(true)
      setError(null)
      sessionStorage.setItem("dashboardAuth", "true")
      fetchGuests()
      fetchGuestRequests()
      fetchEntourage()
      fetchPrincipalSponsors()
      fetchMessages()
    } else {
      setError("Incorrect password. Please try again.")
      setPassword("")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("dashboardAuth")
    setPassword("")
    setGuests([])
    setFilteredGuests([])
    setMessages([])
  }

  const handleSyncSpreadsheet = () => {
    fetchGuests()
    fetchGuestRequests()
    fetchEntourage()
    fetchPrincipalSponsors()
    fetchMessages()
  }

  const handleApproveRequest = async (request: GuestRequest) => {
    if (!confirm(`Add ${request.Name} to the guest list?`)) {
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      // Add to main guest list
      const addResponse = await fetch("/api/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: request.Name,
          role: "Guest",
          email: request.Email || "",
          contact: request.Phone || "",
          message: request.Message || "",
          allowedGuests: parseInt(request.Guest) || 1,
          companions: [],
          tableNumber: "",
          isVip: false,
          status: request.RSVP === "Yes" ? "confirmed" : "pending",
          addedBy: "Request Approved",
        }),
      })

      if (!addResponse.ok) {
        throw new Error("Failed to add to guest list")
      }

      // Delete from guest requests
      const deleteResponse = await fetch("/api/guest-requests", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name: request.Name }),
      })

      if (!deleteResponse.ok) {
        throw new Error("Failed to remove from requests")
      }

      setSuccessMessage(`${request.Name} added to guest list!`)
      setTimeout(() => setSuccessMessage(null), 3000)
      await fetchGuests()
      await fetchGuestRequests()
    } catch (error) {
      console.error("Error approving request:", error)
      setError("Failed to approve request")
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }
  
  // New handlers for the improved guest list
  const handleAddGuest = async (guestData: Omit<Guest, 'id'>) => {
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch("/api/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(guestData),
      })

      if (!response.ok) {
        throw new Error("Failed to add guest")
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      setSuccessMessage(`✓ ${guestData.name} added successfully!`)
      setTimeout(() => setSuccessMessage(null), 3000)
      await fetchGuests()
    } catch (error: any) {
      console.error("Error adding guest:", error)
      setError(`Failed to add guest: ${error.message}`)
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateGuest = async (guest: Guest) => {
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch("/api/guests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(guest),
      })

      if (!response.ok) {
        throw new Error("Failed to update guest")
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      setSuccessMessage(`✓ ${guest.name} updated successfully!`)
      setTimeout(() => setSuccessMessage(null), 3000)
      await fetchGuests()
    } catch (error: any) {
      console.error("Error updating guest:", error)
      setError(`Failed to update guest: ${error.message}`)
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteGuest = async (id: string) => {
    const guestToDelete = guests.find(g => g.id === id)
    
    if (!confirm(`Are you sure you want to delete ${guestToDelete?.name || 'this guest'}?`)) {
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch("/api/guests", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete guest")
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      setSuccessMessage(`✓ Guest deleted successfully!`)
      setTimeout(() => setSuccessMessage(null), 3000)
      await fetchGuests()
    } catch (error: any) {
      console.error("Error deleting guest:", error)
      setError(`Failed to delete guest: ${error.message}`)
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const getRSVPStats = () => {
    const attending = guests.filter((g) => g.status === "confirmed").length
    const notAttending = guests.filter((g) => g.status === "declined").length
    const pending = guests.filter((g) => g.status === "pending" || !g.status).length
    // Calculate total guests by summing allowedGuests
    const totalGuests = guests.reduce((sum, guest) => {
      return sum + (guest.allowedGuests || 1)
    }, 0)
    return { attending, notAttending, pending, total: guests.length, totalGuests }
  }

  const stats = getRSVPStats()

  const messageCount = messages.length

  // Login Screen
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
            <div className="text-center mb-8">
              {siteConfig.couple.monogram && (
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
                className="beautiful-malera text-4xl sm:text-5xl leading-none"
                style={{ color: "var(--color-welcome-script)" }}
              >
                {debutantNickname}
              </p>
              <h1
                className={`${cinzel.className} mt-2 text-lg sm:text-xl font-semibold tracking-[0.12em]`}
                style={{ color: "var(--color-welcome-navy)" }}
              >
                {debutantName}
              </h1>
              <p
                className="font-goudy-italic mt-2 text-sm sm:text-base"
                style={{ color: "var(--color-welcome-text-soft)" }}
              >
                {debutantNickname}&apos;s 18th Birthday Debut · {debutDate}
              </p>

              <div className="mt-4 flex items-center justify-center">
                <span
                  className="h-px w-16 sm:w-24"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent), transparent)",
                  }}
                />
              </div>

              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mt-6 mb-4 shadow-md"
                style={{ background: "linear-gradient(135deg, var(--color-motif-deep), var(--color-motif-medium))" }}
              >
                <Lock className="h-7 w-7 text-white" />
              </div>
              <h2
                className={`${cinzel.className} text-xl font-semibold tracking-[0.1em] mb-2`}
                style={{ color: "var(--color-welcome-heading)" }}
              >
                Debut Admin Dashboard
              </h2>
              <p
                className="font-goudy-italic text-sm"
                style={{ color: "var(--color-welcome-text-soft)" }}
              >
                Enter the password to manage {debutantNickname}&apos;s debut invitation.
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

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
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
          </div>
        </div>
      </div>
    )
  }

  // Main Dashboard Layout
  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: "var(--color-motif-cream)" }}
    >
      {/* Sidebar */}
      <DashboardSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        guestRequestCount={guestRequests.length}
        messageCount={messageCount}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div
          className="sticky top-0 z-10 border-b backdrop-blur-md"
          style={{
            backgroundColor: "color-mix(in srgb, var(--color-motif-soft) 94%, white)",
            borderColor: "color-mix(in srgb, var(--color-motif-deep) 12%, transparent)",
          }}
        >
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <p
                className={`${cinzel.className} text-xs font-semibold uppercase tracking-[0.14em]`}
                style={{ color: "var(--color-welcome-heading)" }}
              >
                Welcome back
              </p>
              <p
                className="beautiful-malera text-3xl leading-none mt-1"
                style={{ color: "var(--color-welcome-script)" }}
              >
                {debutantNickname}
              </p>
              <p
                className="font-goudy-italic text-sm mt-1"
                style={{ color: "var(--color-welcome-text-soft)" }}
              >
                {debutantNickname}&apos;s 18th Birthday Debut · {debutDate}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleSyncSpreadsheet}
                disabled={isLoading}
                size="sm"
                variant="outline"
                className="border-motif-silver hover:border-motif-deep hover:text-motif-deep"
                style={{ color: "var(--color-welcome-text-soft)" }}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh Data
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

        {/* Content Area */}
        <div className="p-8">
          {/* Success/Error Messages */}
          {successMessage && (
            <div className="mb-6 flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <span>{successMessage}</span>
              <button onClick={() => setSuccessMessage(null)} className="ml-auto">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {error && (
            <div className="mb-6 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
              <button onClick={() => setError(null)} className="ml-auto">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Tab Content */}
          {activeTab === "dashboard" && (
            <DashboardOverview
              stats={{
                guestGroups: stats.total,
                confirmedPax: stats.totalGuests,
                pendingRSVP: stats.pending,
                joinRequests: guestRequests.length,
                attending: stats.attending,
                notAttending: stats.notAttending,
                entourage: entourage.length,
                principalSponsors: principalSponsors.length,
              }}
            />
          )}

          {activeTab === "guests" && (
            <div>
              <h2
                className={`${cinzel.className} text-2xl font-semibold tracking-[0.08em] mb-6`}
                style={{ color: "var(--color-welcome-heading)" }}
              >
                Debut Guest List
              </h2>
              <div
                className="rounded-xl shadow-sm border p-6"
                style={{
                  backgroundColor: "color-mix(in srgb, white 88%, var(--color-motif-soft))",
                  borderColor: "color-mix(in srgb, var(--color-motif-deep) 14%, transparent)",
                }}
              >
                <ImprovedGuestList
                  guests={filteredGuests}
                  onAddGuest={handleAddGuest}
                  onUpdateGuest={handleUpdateGuest}
                  onDeleteGuest={handleDeleteGuest}
                />
              </div>
            </div>
          )}

          {activeTab === "requests" && (
            <GuestRequests
              requests={filteredRequests}
              onRefresh={fetchGuestRequests}
              onApproveRequest={handleApproveRequest}
              isLoading={isLoading}
            />
          )}

          {activeTab === "messages" && (
            <GuestMessages messages={messages} onRefresh={fetchMessages} isLoading={isMessagesLoading} />
          )}

          {activeTab === "entourage" && (
            <EntourageSponsors
              entourage={filteredEntourage}
              principalSponsors={filteredPrincipalSponsors}
              onRefreshEntourage={fetchEntourage}
              onRefreshSponsors={fetchPrincipalSponsors}
              isLoading={isLoading}
            />
          )}

          {activeTab === "proposals" && <ProposalDashboard />}
        </div>
      </div>
    </div>
  )
}

