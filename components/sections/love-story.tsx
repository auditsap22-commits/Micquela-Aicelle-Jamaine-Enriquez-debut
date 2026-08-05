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
      Through the Years
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9] mt-2 sm:mt-2.5 md:mt-3`}
        style={{
          fontSize: "var(--script-size)",
          color: "var(--color-welcome-green)",
        }}
      >
        From Childhood to Eighteen
      </span>
      <span className="sr-only">From Childhood to Eighteen</span>
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
            src="/decoration/top-right.png"
            alt=""
            className={CORNER_DECO_CLASS}
          />
        </div>
        <div className="pointer-events-none absolute left-0 top-0 z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/decoration/top-left.png"
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
  title="Eighteen Years in the Making"
  imageSrc="/mobile-background/debut (1).webp"
  text={
    <>
      <p className="mb-4">
      Eighteen years ago, a little girl arrived and changed everything for the people who love her most.
      </p>
    </>
  }
/>

<StorySection
  theme="dark"
  layout="image-right"
  imageSrc="/mobile-background/debut (2).webp"
  // title="A Childhood Full of Wonder"
  text={
    <>
      <p className="mb-4">
      From scraped knees to school days, every little moment was a step toward the young woman she is today.
      </p>
    </>
  }
/>

<StorySection
  theme="light"
  layout="image-left"
  imageSrc="/mobile-background/debut (3).webp"
  // title="Family, Her First Home"
  text={
    <>
      <p>
      Behind every milestone was a family cheering her on, offering love, patience, and endless support.
      </p>
    </>
  }
/>

<StorySection
  theme="dark"
  layout="image-right"
  imageSrc="/mobile-background/debut (4).webp"
  // title="Friends Who Became Family"
  text={
    <>
      <p>
      Along the way, friendships were made that turned into a second family — the ones who laughed with her, grew with her, and stayed.
      </p>
    </>
  }
/>

<StorySection
  theme="light"
  layout="image-left"
  imageSrc="/mobile-background/debut (5).webp"
  // title="Lessons Learned, Dreams Formed"
  text={
    <>
      <p>
      Through every high and low, she learned what she values, who she is, and who she's becoming.
      </p>
    </>
  }
/>

<StorySection
  theme="dark"
  layout="image-right"
  imageSrc="/mobile-background/debut (6).webp"
  // title="The Girl She Was"
  text={
    <>
      <p className="mb-4">
      She carries with her every version of who she used to be — the dreamer, the student, the friend, the daughter.
      </p>
    </>
  }
/>

<StorySection
  theme="light"
  layout="image-left"
  imageSrc="/mobile-background/debut (7).webp"
  // title="The Woman She Is Becoming"
  text={
    <>
      <p className="mb-4">
      And now, she steps into a new chapter — more confident, more grateful, and more herself than ever before.
      </p>
    </>
  }
/>

<StorySection
  theme="dark"
  layout="image-right"
  imageSrc="/mobile-background/debut (8).webp"
  // title="A Celebration of Gratitude"
  text={
    <>
      <p className="mb-4">
      This milestone belongs not just to her, but to everyone who has been part of her story so far.
      </p>
    </>
  }
/>

<StorySection
  theme="light"
  layout="image-left"
  imageSrc="/mobile-background/debut (9).webp"
  // title="To Everyone Who Shaped Her Story"
  text={
    <>
      <p className="mb-4">
      To family, friends, and everyone who has loved and guided her — thank you for being part of this journey.
      </p>
    </>
  }
/>

<StorySection
  theme="dark"
  layout="image-right"
  imageSrc="/mobile-background/debut (10).webp"
  // title="A New Chapter Begins"
  text={
    <>
      <p className="mb-4">
      Eighteen years of memories lead to this moment — a celebration of who she was, who she is, and who she's still becoming.
      </p>
    </>
  }
/>

<StorySection
  theme="light"
  layout="image-left"
  isLast={true}
  imageSrc="/mobile-background/debut (11).webp"
  // title="Join the Celebration"
  text={
    <>
      <p className="mb-4">
      Micquela Aicelle Jamaine G. Enriquez turns eighteen, and she would love nothing more than to celebrate with the people who matter most.
      </p>
      <p>
      Join us on August 15, 2026, 6:00 PM – 10:00 PM, at Boss and Docs Villa 2 and 3, Laguna Hills, as we welcome her into a new chapter.
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
            src="/decoration/bottom-left.png"
            alt=""
            className={CORNER_DECO_CLASS}
          />
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0 z-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/decoration/bottom-right.png"
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
