"use client"

import React from "react"
import localFont from "next/font/local"
import { StorySection } from "@/components/StorySection"
import { layeredSectionTitleSize, sectionType } from "@/lib/section-typography"

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
  "block h-auto w-auto max-w-[120px] sm:max-w-[160px] md:max-w-[220px] lg:max-w-[260px]"

function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span
        className="h-px w-6 sm:w-10"
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent))",
        }}
      />
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

function LoveStoryTitle() {
  return (
    <h1
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center mt-8 sm:mt-10 md:mt-12"
      style={
        {
          "--title-size": layeredSectionTitleSize.main,
          "--script-size": layeredSectionTitleSize.script,
          "--script-overlap": layeredSectionTitleSize.overlap,
        } as React.CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.13em] md:tracking-[0.14em] mt-4 sm:mt-5 md:mt-6`}
        style={{
          fontSize: "var(--title-size)",
          color: "var(--color-welcome-navy)",
        }}
      >
       Our Love Story
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9]`}
        style={{
          marginTop: "calc(var(--script-overlap) + clamp(0.5rem, 2vw, 1rem))",
          fontSize: "var(--script-size)",
          color: "var(--color-welcome-green)",
          textShadow:
            "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 0 10px color-mix(in srgb, var(--color-welcome-bg) 65%, white)",
        }}
      >
        Our Journey to Forever
      </span>
      <span className="sr-only">Our Journey to Forever</span>
    </h1>
  )
}

export function LoveStory() {
  return (
    <div className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative min-h-screen overflow-x-hidden`}>
      <div
        className="relative px-4 pb-2 pt-8 text-center sm:pt-10 md:pt-12"
        style={{ background: "var(--color-welcome-bg)" }}
      >
        <div className="pointer-events-none  absolute right-0 top-0 z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/decoration/right-top-deco.png"
            alt=""
            className={CORNER_DECO_CLASS}
          />
        </div>
        <div className="pointer-events-none absolute left-0 top-0 z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/decoration/left-top-deco.png"
            alt=""
            className={CORNER_DECO_CLASS}
          />
        </div>
        <div className="relative z-20 mx-auto max-w-5xl @container/love-story">
          <div className="mx-auto mb-5 sm:mb-6 md:mb-7">
            <OrnamentalDivider />
          </div>
          <div className="mx-auto">
            <LoveStoryTitle />
          </div>
        </div>
{/* 
        <p
          className="font-goudy-italic mx-auto mt-4 max-w-xl text-[0.75rem] leading-snug sm:mt-5 sm:text-[0.8125rem] md:mt-6 md:text-[0.84375rem]"
          style={{ color: "var(--color-welcome-text)" }}
        >
          &ldquo;11 Years of Love, Now Forever&rdquo;
        </p> */}
      </div>

      <StorySection
  theme="light"
  layout="image-left"
  isFirst={true}
  title="A Glance Down the Corridor"
  imageSrc="/LoveStory/story (13).webp"
  text={
    <>
      <p className="mb-4">
      It all started with a glance in her direction. June and Jonas both happened to be working in the same hospital, at opposite ends of a corridor on the second floor. Nakita lang, pero hindi alam kung napansin. But there already seemed to be something there — or at least the promise of something.
      </p>
    </>
  }
/>
 
<StorySection
  theme="dark"
  layout="image-right"
  imageSrc="/LoveStory/story (6).webp"
  title="Introduced by a Friend"
  text={
    <>
      <p className="mb-4">
      They were eventually introduced by a common friend, and no doubt there was a spark. Or at least there was a smile. From there, June and Jonas got to be friends — the kind that hinted at becoming something more.
      </p>
    </>
  }
/>
 
<StorySection
  theme="light"
  layout="image-left"
  imageSrc="/LoveStory/story (2).webp"
  title="Regular Dates"
  text={
    <>
      <p>
      Dinners out, movies, afternoons of window shopping — the regular dates that slowly became something they both looked forward to, one small outing at a time.
      </p>
    </>
  }
/>
 
<StorySection
  theme="dark"
  layout="image-right"
  imageSrc="/LoveStory/story (8).webp"
  title="Finding Common Ground"
  text={
    <>
      <p>
      Along the way, they found common interests — traveling chief among them. And that is how, during the tail end of 2015, they found themselves in Georgia, discovering the world a little more, together.
      </p>
    </>
  }
/>
 
<StorySection
  theme="light"
  layout="image-left"
  imageSrc="/LoveStory/story (9).webp"
  title="Conversations We Never Wanted to End"
  text={
    <>
      <p>
      What began as easy small talk turned into conversations that didnt seem to want to end. The more they talked, the more they wanted to keep talking — and somewhere in there, the two of them became inseparable.
      </p>
    </>
  }
/>
 
<StorySection
  theme="dark"
  layout="image-right"
  imageSrc="/LoveStory/story (4).webp"
  title="When Friendship Blossomed Into Love"
  text={
    <>
      <p className="mb-4">
      And before they knew it, ang nakasanayan naging nakakakilig. Friendship blossomed into love, and June and Jonas were officially a couple.
      </p>
    </>
  }
/>
 
<StorySection
  theme="light"
  layout="image-left"
  imageSrc="/LoveStory/story (1).webp"
  title="Almost a Decade, Together"
  text={
    <>
      <p className="mb-4">
      Their relationship spanned almost a decade — together in Abu Dhabi through the first few years, <br className="hidden md:block" />
      then apart in different countries, even different continents, during the latter part, with a global pandemic stuck right in the middle.
      </p>
    </>
  }
/>
 
<StorySection
  theme="dark"
  layout="image-right"
  imageSrc="/LoveStory/story (11).webp"
  title="Constant, Through the Distance"
  text={
    <>
      <p className="mb-4">
      All throughout, they made sure to keep in constant communication, to keep providing each other support, reassurance, and inspiration, no matter how far apart they were.
      </p>
    </>
  }
/>
 
<StorySection
  theme="light"
  layout="image-left"
  imageSrc="/LoveStory/story (5).webp"
  title="Time Together, Miles Apart"
  text={
    <>
      <p className="mb-4">
      Even though they were apart most of the time, they still found a few weeks each year to be with each other — chasing new destinations like Italy, Slovenia, and Prague, and revisiting favorite places back home in the Philippines.
      </p>
    </>
  }
/>
 
<StorySection
  theme="dark"
  layout="image-right"
  imageSrc="/LoveStory/story (3).webp"
  title="He Asked, and She Said Yes"
  text={
    <>
      <p className="mb-4">
      Then in the spring of 2025, during a visit to her in Austria, he popped the question — under a giant ferris wheel somewhere in Vienna. And she said yes. And so here they are, starting a new chapter in the journey to forever.
      </p>
    </>
  }
/>
 
<StorySection
  theme="light"
  layout="image-left"
  isLast={true}
  imageSrc="/LoveStory/story (12).webp"
  title="Habangbuhay"
  text={
    <>
      <p className="mb-4">
      In front of family, friends, and the rest of the world, June and Jonas are tying the knot, making their vows, saying "I do," and one more time exchanging their I love yous. All the cliches, and yet they mean a little bit more. <br className="hidden md:block" />
      But that is what 10 years — after a longing glance, a friendship that blossomed into romance, and maybe even a heartfelt (albeit choreographed) wedding dance — can lead to. Habangbuhay.
      </p>
      <p>
      See you on the 26th of December, 2026!
      </p>
    </>
  }
/>
<div
        className="relative px-4 pb-16 pt-8 text-center sm:pb-20 sm:pt-10 md:pb-24 md:pt-12"
        style={{ background: "var(--color-welcome-bg)" }}
      >
        <div className="pointer-events-none absolute bottom-0 left-0 z-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/decoration/left-bottom-deco.png"
            alt=""
            className={CORNER_DECO_CLASS}
          />
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0 z-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/decoration/right-bottom-deco.png"
            alt=""
            className={CORNER_DECO_CLASS}
          />
        </div>
        <div className="relative z-20">
          <div className="mx-auto mb-5 sm:mb-6">
            <OrnamentalDivider />
          </div>
          <blockquote className="mx-auto max-w-xl px-2">
            <p
              className={`font-goudy-italic ${sectionType.textRelaxed} italic leading-relaxed`}
              style={{ color: "var(--color-welcome-text)" }}
            >
              &ldquo;I have found the one whom my soul loves.&rdquo;
            </p>
            <footer
              className={`font-goudy-italic mt-2 sm:mt-3 ${sectionType.label} not-italic tracking-wide`}
              style={{ color: "var(--color-welcome-green)" }}
            >
              — Song of Solomon 3: 4
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
