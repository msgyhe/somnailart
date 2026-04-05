"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import ShineBorder from "./shine-border";
import TypeWriter from "./type-writer";
import { useAuth } from "@/context/AuthContext";

const HeroCanvas = dynamic(() => import("./canvas"), { ssr: false });

function SparklesSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z" fill="currentColor" />
      <path d="M19 3L19.75 5.25L22 6L19.75 6.75L19 9L18.25 6.75L16 6L18.25 5.25L19 3Z" fill="currentColor" opacity="0.7" />
      <path d="M5 14L5.5 15.5L7 16L5.5 16.5L5 18L4.5 16.5L3 16L4.5 15.5L5 14Z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function WandSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 4L20 9L9 20L4 15L15 4Z" />
      <path d="M20 4L20 9L15 4" />
      <path d="M3 3L4.5 4.5M20.5 3L19 4.5M3 21L4.5 19.5" />
    </svg>
  );
}

function ArrowRightSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10H16M16 10L11 5M16 10L11 15" />
    </svg>
  );
}

function PlayCircleSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

interface ThumbnailCardProps {
  gradient: [string, string];
  rotate?: number;
  barWidth?: number;
  uid: string;
  animDuration?: string;
  animDelay?: string;
}

function ThumbnailCard({ gradient, rotate = 0, barWidth = 100, uid, animDuration = "6s", animDelay = "0s" }: ThumbnailCardProps) {
  return (
    <svg
      width="200"
      height="113"
      viewBox="0 0 200 113"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={
        {
          "--rotate": `${rotate}deg`,
          animation: `float-slow ${animDuration} ease-in-out ${animDelay} infinite`,
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))",
        } as React.CSSProperties
      }
    >
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="200" y2="113" gradientUnits="userSpaceOnUse">
          <stop stopColor={gradient[0]} />
          <stop offset="1" stopColor={gradient[1]} />
        </linearGradient>
        <clipPath id={`clip-${uid}`}>
          <rect width="200" height="113" rx="8" />
        </clipPath>
      </defs>
      <g clipPath={`url(#clip-${uid})`}>
        <rect width="200" height="113" fill={`url(#${uid})`} />
        <rect width="200" height="113" fill="rgba(0,0,0,0.12)" />
        {/* Center play button */}
        <circle cx="100" cy="52" r="20" fill="rgba(0,0,0,0.45)" />
        <path d="M94 43L94 61L113 52L94 43Z" fill="white" />
        {/* Bottom info bar */}
        <rect y="88" width="200" height="25" fill="rgba(0,0,0,0.6)" />
        <rect x="8" y="94" width={barWidth} height="7" rx="3.5" fill="rgba(255,255,255,0.85)" />
        <rect x="8" y="105" width="48" height="4" rx="2" fill="rgba(255,255,255,0.35)" />
        {/* AI badge */}
        <rect x="156" y="6" width="38" height="16" rx="5" fill="rgba(168,85,247,0.9)" />
        <rect x="162" y="11" width="12" height="5" rx="2.5" fill="rgba(255,255,255,0.95)" />
        <rect x="178" y="11" width="10" height="5" rx="2.5" fill="rgba(255,255,255,0.6)" />
      </g>
    </svg>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-xl font-bold text-white">{value}</span>
      <span className="text-xs text-white/40">{label}</span>
    </div>
  );
}

export default function Hero() {
  const router = useRouter();
  const { user } = useAuth();

  const handleStart = () => {
    router.push(user ? "/dashboard" : "/auth");
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
      <HeroCanvas />

      {/* Left decorative thumbnails */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 opacity-[0.18] select-none pointer-events-none">
        <ThumbnailCard uid="g1" gradient={["#6366f1", "#8b5cf6"]} rotate={-8} barWidth={110} animDuration="7s" animDelay="0s" />
        <ThumbnailCard uid="g2" gradient={["#ec4899", "#f43f5e"]} rotate={4} barWidth={90} animDuration="5s" animDelay="1.5s" />
        <ThumbnailCard uid="g3" gradient={["#0ea5e9", "#6366f1"]} rotate={-4} barWidth={130} animDuration="6.5s" animDelay="0.8s" />
      </div>

      {/* Right decorative thumbnails */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 opacity-[0.18] select-none pointer-events-none">
        <ThumbnailCard uid="g4" gradient={["#a855f7", "#ec4899"]} rotate={7} barWidth={100} animDuration="6s" animDelay="0.5s" />
        <ThumbnailCard uid="g5" gradient={["#14b8a6", "#6366f1"]} rotate={-4} barWidth={120} animDuration="8s" animDelay="2s" />
        <ThumbnailCard uid="g6" gradient={["#f59e0b", "#ec4899"]} rotate={5} barWidth={85} animDuration="5.5s" animDelay="1s" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-3xl px-6">

        {/* Badge */}
        <ShineBorder
          borderRadius={999}
          borderWidth={1}
          duration={8}
          color={["#a855f7", "#6366f1", "#ec4899"]}
          className="!bg-black/60 px-5 py-2 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2">
            <SparklesSVG className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300 whitespace-nowrap">
              AI-Powered Thumbnail Generator
            </span>
          </div>
        </ShineBorder>

        {/* Headline */}
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-tight text-white">
            YouTube 썸네일,
          </h1>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            AI로 완성하다
          </h1>
        </div>

        {/* Typewriter */}
        <p className="text-lg sm:text-xl font-medium text-purple-300/90 min-h-7">
          <TypeWriter
            strings={[
              "클릭률을 3배 높이는 썸네일",
              "단 10초 만에 전문가급 디자인",
              "무한한 스타일 커스터마이징",
              "크리에이터를 위한 AI 솔루션",
            ]}
          />
        </p>

        {/* Description */}
        <p className="text-base sm:text-lg text-white/50 max-w-xl leading-relaxed">
          Thumbnailart AI가 당신의 콘텐츠를 분석하고, 클릭률을 극대화하는
          유튜브 썸네일을 단 몇 초 만에 생성합니다.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleStart}
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-105 active:scale-95"
          >
            <WandSVG className="w-4 h-4" />
            {user ? "대시보드로 이동" : "무료로 시작하기"}
            <ArrowRightSVG className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30 active:scale-95">
            <PlayCircleSVG className="w-4 h-4" />
            데모 보기
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 pt-2">
          <StatItem value="10K+" label="크리에이터" />
          <div className="w-px h-8 bg-white/10" />
          <StatItem value="1M+" label="생성된 썸네일" />
          <div className="w-px h-8 bg-white/10" />
          <StatItem value="3x" label="평균 클릭률 향상" />
        </div>
      </div>
    </section>
  );
}
