"use client"

import { useMemo, useState, type ReactNode } from "react"
import type { SiteConfig } from "@/lib/site-config"
import { ChevronDown } from "lucide-react"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
import { useSiteConfig } from "@/hooks/use-site-config"
import { layeredSectionTitleSize, sectionType } from "@/lib/section-typography"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const theSeasons = localFont({
  src: "../../Font/Fontspring-DEMO-theseasons-reg.otf",
  display: "swap",
  variable: "--font-the-seasons",
})

const aboveTheBeyond = localFont({
  src: "../../Font/above-the-beyond-script.otf",
  display: "swap",
  variable: "--font-above-beyond",
})

const CORNER_DECO_CLASS =
  "block h-auto w-auto max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[380px]"

const palette = {
  body: "var(--color-welcome-text)",
  heading: "var(--color-welcome-navy)",
  label: "var(--color-welcome-heading)",
  accent: "var(--color-welcome-green)",
} as const

const dividerLineStyle = {
  background:
    "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent), transparent)",
} as const

const ct = {
  label: sectionType.label,
  body: sectionType.textRelaxed,
  bodyLg: sectionType.textRelaxed,
  question: sectionType.text,
} as const

const linkClass =
  "underline font-semibold transition-colors hover:opacity-80"

const cardStyle = {
  background: "var(--color-welcome-bg)",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "color-mix(in srgb, var(--color-motif-deep) 14%, transparent)",
  boxShadow:
    "0 8px 28px color-mix(in srgb, var(--color-motif-deep) 7%, transparent), inset 0 1px 0 color-mix(in srgb, white 70%, transparent)",
} as const

interface FAQItem {
  question: string
  answer: string | ReactNode
}

function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={dividerLineStyle} />
      <span className="h-0.5 w-0.5 rounded-full bg-motif-deep/45 sm:h-1 sm:w-1" aria-hidden />
      <span
        className="h-px w-6 sm:w-10"
        style={{
          background:
            "linear-gradient(to left, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent))",
        }}
      />
    </div>
  )
}

function DebutantLabel({ nickname }: { nickname: string }) {
  const lineStyle = {
    background:
      "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-welcome-navy) 35%, transparent))",
  }

  return (
    <div className="flex items-center justify-center gap-2.5 sm:gap-3.5">
      <span className="h-px w-5 sm:w-7 md:w-9" style={lineStyle} aria-hidden />
      <p
        className={`${cinzel.className} ${sectionType.label} shrink-0 py-0.5 font-semibold uppercase leading-normal tracking-[0.34em] min-[400px]:tracking-[0.38em] sm:tracking-[0.44em]`}
        style={{ color: "var(--color-welcome-navy)" }}
      >
        {nickname}
        <span
          className={`${aboveTheBeyond.className} mx-1.5 inline-block normal-case tracking-normal sm:mx-2`}
          style={{
            fontSize: "1.35em",
            color: "var(--color-welcome-green)",
            verticalAlign: "middle",
          }}
          aria-hidden
        >
          turns
        </span>
        eighteen
      </p>
      <span
        className="h-px w-5 sm:w-7 md:w-9"
        style={{
          background:
            "linear-gradient(to left, transparent, color-mix(in srgb, var(--color-welcome-navy) 35%, transparent))",
        }}
        aria-hidden
      />
    </div>
  )
}

function FaqTitle() {
  return (
    <h2
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center mt-4 sm:mt-5 md:mt-6"
      style={
        {
          "--title-size": layeredSectionTitleSize.main,
          "--script-size": layeredSectionTitleSize.script,
        } as React.CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.13em] md:tracking-[0.14em] mt-4 pb-1 sm:mt-5 sm:pb-1.5 md:mt-6`}
        style={{
          fontSize: "var(--title-size)",
          color: "var(--color-welcome-navy)",
        }}
      >
        Frequently Asked Questions
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9] mt-2 sm:mt-2.5 md:mt-3`}
        style={{
          fontSize: "var(--script-size)",
          color: "var(--color-welcome-green)",
        }}
      >
        for her debut
      </span>
      <span className="sr-only">for her debut</span>
    </h2>
  )
}

function getFaqItems(siteConfig: SiteConfig): FAQItem[] {
  const debutantNickname = siteConfig.couple.debutNickname || siteConfig.couple.debutName
  const guestArrival = siteConfig.ceremony.guestsTime ?? "30–45 minutes before the program"
  const dressTheme = siteConfig.dressCode.theme

  return [
    {
      question: "When is the debut?",
      answer: `${debutantNickname}'s debut celebration will be held on ${siteConfig.ceremony.date} (${siteConfig.ceremony.day}).`,
    },
    {
      question: "What time should I arrive?",
      answer: `The program will begin promptly at ${siteConfig.ceremony.time}. We kindly ask guests to arrive by ${guestArrival} to allow enough time for parking, finding your seat, and settling in comfortably before the celebration begins.`,
    },
    {
      question: "Where will the debut celebration take place?",
      answer: (
        <>
          <p className="mb-4">
            The debut will be held at {siteConfig.ceremony.location}, located at{" "}
            {siteConfig.ceremony.venue}.
          </p>
          <p>
            Guest arrival is at {guestArrival}, and the program will begin at{" "}
            {siteConfig.ceremony.time}.
          </p>
        </>
      ),
    },
    {
      question: "How do I RSVP?",
      answer: (
        <>
          Please RSVP using the{" "}
          <a
            href="#guest-list"
            className={linkClass}
            style={{ color: palette.accent }}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("guest-list")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            guest list
          </a>{" "}
          on this invitation: search for your name and confirm your attendance.
          {"\n\n"}
          Please respond by {siteConfig.details.rsvp.deadline.replace(/\.\s*$/, "")}.
          {"\n\n"}
          If you have questions, please contact {siteConfig.details.rsvp.coordinator} at{" "}
          {siteConfig.details.rsvp.phone}.
        </>
      ),
    },
    {
      question: 'Do we really need to RSVP if we already said "Yes" in person?',
      answer:
        "Yes, please. We need your formal RSVP to consolidate guest details and finalize the headcount for catering and seating.",
    },
    {
      question: "Can I choose my own seat at the celebration?",
      answer:
        "Please don't. Our seating arrangement was carefully planned for everyone's comfort and convenience.",
    },
    {
      question: 'Can I bring a "plus one" to the event?',
      answer:
        "As much as we would love to welcome everyone, we have a limited guest list. This celebration is strictly by invitation only.",
    },
    {
      question: "Can I bring my child to the event?",
      answer: `We kindly request that ${debutantNickname}'s debut be an adults-only occasion. We hope this allows everyone to relax and fully enjoy the celebration. Children who are part of the entourage are warmly included.`,
    },
    {
      question:
        'I said "No" to the RSVP but had a change of plans—I can attend now. What should I do?',
      answer:
        "Please check with us first as we have a strict guest list. If seats become available, we will let you know as soon as possible. Please do not attend unannounced, as we may not have any available seats for you.",
    },
    {
      question: "What if I already RSVP'd but can no longer attend?",
      answer: `We would love to have you at ${debutantNickname}'s debut, but we understand that circumstances change. Please let us know as soon as possible so we can reallocate your seat.`,
    },
    {
      question: "Is there parking available?",
      answer:
        "Yes, parking is available at the venue, and parking attendants, along with our coordinators, will assist you on the day.",
    },
    {
      question: "What is the dress code?",
      answer: `${dressTheme}. Please dress according to the attire guidelines and color palette in the Event Details section. Strictly no casual clothes, shoes, or white-colored attire.`,
    },
    {
      question: "Are guests allowed to take photos during the program?",
      answer:
        "We encourage everyone to stay present during the program. You may take photos, but please keep it minimal and avoid blocking or crowding our official photographers. Professional photos will be shared after the event.",
    },
    {
      question: "Can I take photos during the celebration?",
      answer:
        "Yes! After the formal program, feel free to capture the fun moments throughout the evening. We prepared this celebration wholeheartedly and want everyone to enjoy it fully.",
    },
    {
      question: "When is the appropriate time to leave?",
      answer: `We humbly request that you celebrate with ${debutantNickname} until the program ends. Let's laugh, take pictures, sing, and enjoy this special milestone together!`,
    },
    {
      question: "What if I have dietary restrictions or allergies?",
      answer:
        "Please let us know about any dietary restrictions or allergies when you RSVP. We want to ensure everyone can enjoy the celebration comfortably.",
    },
    {
      question: `How can I help make ${debutantNickname}'s debut memorable?`,
      answer: `• Pray for favorable weather and blessings as she celebrates this milestone.\n\n• RSVP as soon as your schedule is cleared.\n\n• Dress appropriately and follow our ${dressTheme} dress code.\n\n• Be on time.\n\n• Follow the seating arrangement.\n\n• Stay until the end of the program.\n\n• Join the activities and enjoy!`,
    },
  ]
}

function FaqAnswer({ answer }: { answer: string | ReactNode }) {
  if (typeof answer !== "string") {
    return (
      <div
        className={`font-goudy-italic ${ct.body} whitespace-pre-line`}
        style={{ color: palette.body }}
      >
        {answer}
      </div>
    )
  }

  return (
    <p
      className={`font-goudy-italic ${ct.body} whitespace-pre-line`}
      style={{ color: palette.body }}
    >
      {answer}
    </p>
  )
}

export function FAQ() {
  const siteConfig = useSiteConfig()
  const debutantNickname = siteConfig.couple.debutNickname || siteConfig.couple.debutName
  const faqItems = useMemo(() => getFaqItems(siteConfig), [siteConfig])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative z-10 isolate overflow-hidden pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14`}
      style={{ background: "var(--color-welcome-bg)" }}
    >
      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/decoration/top-left.png"
          alt=""
          className={CORNER_DECO_CLASS}
        />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* <img
          src="/decoration/top-right.png"
          alt=""
          className={CORNER_DECO_CLASS}
        /> */}
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/decoration/bottom-left.png"
          alt=""
          className={CORNER_DECO_CLASS}
        />
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* <img
          src="/decoration/bottom-right.png"
          alt=""
          className={CORNER_DECO_CLASS}
        /> */}
      </div>

      {/* Header */}
      <div className="relative z-20 mx-auto max-w-5xl px-6 text-center @container/faq sm:px-10 md:px-12">
        <div className="mx-auto mb-5 sm:mb-6 md:mb-7">
          <OrnamentalDivider />
        </div>
        <DebutantLabel nickname={debutantNickname} />
        <div className="mx-auto mt-6 sm:mt-8 md:mt-10">
          <FaqTitle />
        </div>
        <p
          className={`font-goudy-italic mx-auto mt-4 max-w-2xl px-2 sm:mt-5 md:mt-6 ${ct.bodyLg}`}
          style={{ color: palette.body }}
        >
          Helpful notes so you can simply arrive, celebrate, and enjoy {debutantNickname}&apos;s
          special milestone.
        </p>
        <div className="flex items-center justify-center pt-3 sm:pt-4">
          <span className="h-px w-16 sm:w-24 md:w-32" style={dividerLineStyle} />
        </div>
      </div>

      {/* FAQ accordion */}
      <div className="relative z-20 mx-auto my-6 mb-12 max-w-3xl px-4 sm:my-8 sm:px-6 md:my-10 md:mb-20 md:px-8">
        <div
          className="relative overflow-hidden rounded-xl border backdrop-blur-xl sm:rounded-2xl sm:backdrop-blur-2xl"
          style={cardStyle}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/35 via-white/8 to-transparent"
            aria-hidden
          />

          <div className="relative z-20 space-y-2 p-3 sm:space-y-2.5 sm:p-4 md:p-5">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index
              const contentId = `faq-item-${index}`
              return (
                <div
                  key={index}
                  className="relative z-20 rounded-xl border transition-all duration-300"
                  style={{
                    borderColor: isOpen
                      ? "color-mix(in srgb, var(--color-welcome-green) 35%, transparent)"
                      : "color-mix(in srgb, var(--color-motif-deep) 14%, transparent)",
                    backgroundColor: "var(--color-welcome-bg-soft)",
                    boxShadow: isOpen
                      ? "0 4px 16px color-mix(in srgb, var(--color-motif-deep) 8%, transparent)"
                      : "none",
                  }}
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="group flex w-full items-center justify-between px-3 py-2.5 text-left outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-4 sm:py-3 md:px-5"
                    style={{ outlineColor: palette.accent }}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                  >
                    <span
                      className={`${cinzel.className} ${ct.question} pr-3 font-semibold leading-snug transition-colors duration-200`}
                      style={{ color: isOpen ? palette.accent : palette.heading }}
                    >
                      {item.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`h-4 w-4 flex-shrink-0 transition-transform duration-300 sm:h-5 sm:w-5 ${isOpen ? "rotate-180" : ""}`}
                      style={{ color: isOpen ? palette.accent : palette.label }}
                      aria-hidden
                    />
                  </button>

                  <div
                    id={contentId}
                    role="region"
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className="border-t px-3 pb-3 pt-0 sm:px-4 sm:pb-4 md:px-5"
                        style={{
                          borderColor:
                            "color-mix(in srgb, var(--color-motif-deep) 14%, transparent)",
                        }}
                      >
                        <FaqAnswer answer={item.answer} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
