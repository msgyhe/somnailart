"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

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

function ImageSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

function SettingsSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function HomeSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LogoutSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function PlusSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

interface TileCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
  badge?: string;
  onClick?: () => void;
}

function TileCard({ icon, title, description, accent, badge, onClick }: TileCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-[#1f1f1f] p-6 text-left transition-all hover:border-white/[0.12] hover:bg-[#242424] active:scale-[0.98]"
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
      >
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white/90">{title}</span>
          {badge && (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{ background: `${accent}22`, color: accent }}
            >
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-white/40 leading-relaxed">{description}</p>
      </div>
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 30% 30%, ${accent}08, transparent 60%)` }}
      />
    </button>
  );
}

function StatCard({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-white/[0.06] bg-[#1f1f1f] p-5">
      <span className="text-2xl font-bold" style={{ color: accent }}>{value}</span>
      <span className="text-xs text-white/40">{label}</span>
    </div>
  );
}

const NAV_ITEMS = [
  { icon: <HomeSVG className="w-4 h-4" />, label: "홈" },
  { icon: <WandSVG className="w-4 h-4" />, label: "AI 생성" },
  { icon: <ImageSVG className="w-4 h-4" />, label: "내 썸네일" },
  { icon: <SettingsSVG className="w-4 h-4" />, label: "설정" },
];

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: "#181818" }}
      >
        <div className="flex flex-col items-center gap-3">
          <SparklesSVG className="w-8 h-8 text-purple-400 animate-pulse" />
          <span className="text-sm text-white/30">로딩 중...</span>
        </div>
      </div>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const fullName = (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "사용자";
  const firstName = fullName.split(" ")[0];

  const handleSignOut = async () => {
    await signOut();
    router.replace("/");
  };

  return (
    <div className="flex min-h-screen" style={{ background: "#181818" }}>
      {/* Checkerboard background */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #1f1f1f 25%, transparent 25%),
            linear-gradient(-45deg, #1f1f1f 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #1f1f1f 75%),
            linear-gradient(-45deg, transparent 75%, #1f1f1f 75%)
          `,
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 0 12px, 12px -12px, -12px 0px",
          opacity: 0.6,
        }}
      />

      {/* Sidebar */}
      <aside className="relative z-10 flex w-60 flex-shrink-0 flex-col border-r border-white/[0.05] bg-[#141414]/80 backdrop-blur-sm">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.05]">
          <SparklesSVG className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Thumbnailart
          </span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 p-3 flex-1">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                i === 0
                  ? "bg-white/[0.07] text-white font-medium"
                  : "text-white/40 hover:bg-white/[0.04] hover:text-white/70"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* User profile */}
        <div className="border-t border-white/[0.05] p-3">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={fullName}
                className="w-7 h-7 rounded-full ring-1 ring-white/10 object-cover"
              />
            ) : (
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500/20 text-xs font-bold text-purple-400 ring-1 ring-purple-500/30">
                {firstName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-white/80 truncate">{firstName}</span>
              <span className="text-[10px] text-white/30 truncate">{user.email}</span>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs text-white/30 transition-all hover:bg-white/[0.04] hover:text-white/60"
          >
            <LogoutSVG className="w-3.5 h-3.5" />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="relative z-10 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-8 py-8">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">
              안녕하세요, {firstName}님 👋
            </h1>
            <p className="mt-1 text-sm text-white/40">
              오늘도 멋진 썸네일을 만들어 보세요.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-6 grid grid-cols-3 gap-4">
            <StatCard value="0" label="생성된 썸네일" accent="#a855f7" />
            <StatCard value="0" label="이번 달 생성" accent="#6366f1" />
            <StatCard value="Free" label="현재 플랜" accent="#ec4899" />
          </div>

          {/* Quick action */}
          <div className="mb-6">
            <button className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-dashed border-purple-500/30 bg-purple-500/[0.04] py-5 text-sm font-medium text-purple-400/80 transition-all hover:border-purple-500/50 hover:bg-purple-500/[0.08] hover:text-purple-400 active:scale-[0.99]">
              <PlusSVG className="w-5 h-5" />
              새 썸네일 생성하기
            </button>
          </div>

          {/* Feature tiles */}
          <div className="mb-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/25">기능</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <TileCard
              icon={<WandSVG className="w-5 h-5" />}
              title="AI 썸네일 생성"
              description="키워드만 입력하면 AI가 클릭률 높은 썸네일을 자동 생성합니다."
              accent="#a855f7"
              badge="NEW"
            />
            <TileCard
              icon={<ImageSVG className="w-5 h-5" />}
              title="내 썸네일"
              description="생성한 썸네일을 모아보고 다운로드하세요."
              accent="#6366f1"
            />
            <TileCard
              icon={<SparklesSVG className="w-5 h-5" />}
              title="스타일 템플릿"
              description="다양한 유튜브 스타일 템플릿으로 빠르게 시작하세요."
              accent="#ec4899"
              badge="SOON"
            />
            <TileCard
              icon={<SettingsSVG className="w-5 h-5" />}
              title="설정"
              description="계정 정보와 플랜을 관리하세요."
              accent="#14b8a6"
            />
          </div>

        </div>
      </main>
    </div>
  );
}
