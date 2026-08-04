"use client"

import localFont from "next/font/local"
import { motion } from "motion/react"
import { useSiteConfig } from "@/hooks/use-site-config"
import { sectionType, welcomeTitleSize } from "@/lib/section-typography"
import { Cinzel } from "next/font/google"

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

function OrnamentalDivider({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center justify-center ${compact ? "gap-1.5" : "gap-2"}`}>
      <span
        className={`h-px ${compact ? "w-6 sm:w-10" : "w-8 sm:w-12"}`}
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent))",
        }}
      />
      <span className="h-0.5 w-0.5 rounded-full bg-motif-deep/45 sm:h-1 sm:w-1" aria-hidden />
      <span
        className={`h-px ${compact ? "w-6 sm:w-10" : "w-8 sm:w-12"}`}
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
    <div className="flex items-center justify-center gap-2.5 pt-1 sm:gap-3.5 sm:pt-1.5">
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

function LayeredWelcomeTitle() {
  return (
    <h2
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--welcome-size": welcomeTitleSize.main,
          "--script-size": welcomeTitleSize.script,
          "--script-overlap": welcomeTitleSize.overlap,
        } as React.CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.13em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--welcome-size)",
          color: "var(--color-welcome-navy)",
        }}
      >
        Welcome
      </span>

      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9]`}
        style={{
          // marginTop: "var(--script-overlap)",
          fontSize: "var(--script-size)",
          color: "var(--color-welcome-green)",
          textShadow:
            "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 0 10px color-mix(in srgb, var(--color-welcome-bg) 65%, white)",
        }}
      >
        to her debut
      </span>

      <span className="sr-only"> to her debut</span>
    </h2>
  )
}

export function Welcome() {
  const siteConfig = useSiteConfig()
  const debutantName = siteConfig.couple.debutName
  const debutantNickname = siteConfig.couple.debutNickname || debutantName

  return (
    <section
      id="welcome"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative px-3 py-5 sm:px-5 sm:py-7 md:px-6 md:py-9`}
    >
      <div className="relative mx-auto w-full max-w-xl sm:max-w-2xl">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative min-w-0 overflow-visible rounded-lg border px-4 pt-6 pb-10 @container/welcome sm:rounded-xl sm:px-7 sm:pt-7 sm:pb-12 md:rounded-2xl md:px-8 md:pt-8 md:pb-14"
          style={{
            background: "var(--color-welcome-bg)",
            borderColor: "color-mix(in srgb, var(--color-motif-deep) 14%, transparent)",
            boxShadow:
              "0 8px 28px color-mix(in srgb, var(--color-motif-deep) 7%, transparent), inset 0 1px 0 color-mix(in srgb, white 70%, transparent)",
          }}
        >
          <div className="wedding-frame-inner hidden min-[400px]:block" aria-hidden />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-5 top-0 h-px sm:inset-x-8"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--color-motif-yellow), transparent)",
            }}
          />

          {/* Header */}
          <header className="relative overflow-visible space-y-3 px-1 pt-4 pb-6 sm:space-y-3.5 sm:px-2 sm:pt-5 sm:pb-7 md:space-y-4 md:pt-6 md:pb-8">
            <DebutantLabel nickname={debutantNickname} />
            <LayeredWelcomeTitle />
            <div className="pt-2 sm:pt-2.5">
              <OrnamentalDivider compact />
            </div>
          </header>

          {/* Content */}
          <div className="relative mx-4 space-y-5 text-center sm:mx-6 sm:space-y-6 md:mx-7 md:space-y-7">
            {/* Scripture */}
            <figure
              className="rounded-md border px-4 py-3.5 sm:rounded-lg sm:px-5 sm:py-4"
              style={{
                background: "var(--color-welcome-bg-soft)",
                borderColor: "color-mix(in srgb, var(--color-motif-deep) 10%, transparent)",
              }}
            >
              <blockquote>
                <p
                  className={`font-goudy-italic ${sectionType.textSnug}`}
                  style={{ color: "var(--color-welcome-text)" }}
                >
                  &ldquo;She is clothed with strength and dignity; she can laugh at the days to come.&rdquo;
                </p>
                <figcaption className="mt-2 sm:mt-2.5">
                  <cite
                    className={`${cinzel.className} ${sectionType.label} not-italic uppercase tracking-[0.2em] sm:tracking-[0.24em]`}
                    style={{ color: "var(--color-welcome-heading)" }}
                  >
                    Proverbs 31:25
                  </cite>
                </figcaption>
              </blockquote>
            </figure>

            {/* Body */}
            <div
              className={`font-goudy-italic space-y-3 px-1 text-center sm:space-y-3.5 sm:px-2 md:space-y-4 ${sectionType.textRelaxed}`}
              style={{ color: "var(--color-welcome-text)" }}
            >
              <p>
                Dear family and friends, we are delighted to invite you to a milestone she has
                long dreamed of — her 18th birthday debut. With grateful hearts, her family joins
                us in celebrating this special coming-of-age.
              </p>
              <p>
                This invitation holds everything you may need for the evening: the schedule, venue
                details, and a few gentle reminders along the way. Whether near or far, your
                presence and warm wishes will make this celebration truly meaningful.
              </p>
              <p>
                Thank you for being part of her journey. We look forward to sharing this
                unforgettable night with the people who have loved and supported her along the way.
              </p>
            </div>

            {/* Bottom */}
            <div className="space-y-5 pt-1 sm:space-y-6 sm:pt-2 md:space-y-7">
              {/* <OrnamentalDivider compact /> */}

              {/* Hashtag */}
              <aside
                className="rounded-md border px-4 py-3.5 sm:rounded-lg sm:px-5 sm:py-4"
                style={{
                  background: "var(--color-welcome-bg-soft)",
                  borderColor: "color-mix(in srgb, var(--color-motif-deep) 10%, transparent)",
                }}
              >
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-center sm:gap-2.5">
                  <p
                    className={`${cinzel.className} ${sectionType.label} shrink-0 font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em]`}
                    style={{ color: "var(--color-welcome-heading)" }}
                  >
                    Share the celebration
                  </p>
                  <span className="hidden text-motif-deep/30 sm:inline" aria-hidden>
                    ·
                  </span>
                  <p
                    className={`font-goudy-italic ${sectionType.textSnug}`}
                    style={{ color: "var(--color-welcome-navy)" }}
                  >
                    {siteConfig.snapShare.hashtag.join(" ")}
                  </p>
                </div>
              </aside>

              {/* Sign-off */}
              <footer className="space-y-2 px-1 pt-4 pb-2 sm:space-y-2.5 sm:px-2 sm:pt-5 sm:pb-3 md:pt-6 md:pb-4">
                <p
                  className={`${aboveTheBeyond.className} ${sectionType.script}`}
                  style={{
                    color: "var(--color-welcome-green)",
                    textShadow:
                      "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 90%, white)",
                  }}
                >
                  With love and gratitude,
                </p>
                <p
                  className={`${cinzel.className} ${sectionType.subheader} mb-3 font-semibold tracking-[0.12em] sm:mb-4 sm:tracking-[0.16em] md:mb-5 md:tracking-[0.18em]`}
                  style={{ color: "var(--color-welcome-navy)" }}
                >
                  {debutantName}
                </p>
              </footer>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
