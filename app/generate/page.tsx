"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

// ── SVG icons ────────────────────────────────────────────────────────────────

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

function DownloadSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

// ── Constants ────────────────────────────────────────────────────────────────

const ASPECT_RATIOS = [
  { value: "16:9",  label: "16:9",  desc: "YouTube 표준" },
  { value: "9:16",  label: "9:16",  desc: "쇼츠 / Reels" },
  { value: "1:1",   label: "1:1",   desc: "정사각형" },
  { value: "4:3",   label: "4:3",   desc: "클래식" },
];

const PROMPT_HINTS = [
  "극적인 조명 아래 스포츠카가 질주하는 역동적인 장면, 선명한 네온 컬러",
  "미래 도시 배경의 AI 로봇, 사이버펑크 스타일, 파란 빛",
  "건강한 식단 레시피, 신선한 채소와 과일, 밝고 청량한 느낌",
  "게임 캐릭터가 마지막 보스와 대결하는 웅장한 판타지 장면",
];

const NAV_ITEMS = [
  { icon: <HomeSVG className="w-4 h-4" />,    label: "홈",       href: "/dashboard" },
  { icon: <WandSVG className="w-4 h-4" />,    label: "AI 생성",   href: "/generate" },
  { icon: <ImageSVG className="w-4 h-4" />,   label: "내 썸네일",  href: "/thumbnails" },
  { icon: <SettingsSVG className="w-4 h-4" />, label: "설정",      href: "/settings" },
];

// ── Component ────────────────────────────────────────────────────────────────

export default function GeneratePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [prompt, setPrompt]           = useState("");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [generating, setGenerating]   = useState(false);
  const [resultUrl, setResultUrl]     = useState<string | null>(null);
  const [errorMsg, setErrorMsg]       = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!loading && !user) router.replace("/auth");
  }, [user, loading, router]);

  // 템플릿에서 넘어온 경우 프롬프트 자동 입력
  useEffect(() => {
    const templatePrompt = searchParams.get("prompt");
    if (templatePrompt) setPrompt(templatePrompt);
  }, [searchParams]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: "#181818" }}>
        <SparklesSVG className="w-8 h-8 text-purple-400 animate-pulse" />
      </div>
    );
  }

  const avatarUrl  = user.user_metadata?.avatar_url as string | undefined;
  const fullName   = (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "사용자";
  const firstName  = fullName.split(" ")[0];

  const handleSignOut = async () => {
    await signOut();
    router.replace("/");
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || generating) return;
    setGenerating(true);
    setResultUrl(null);
    setErrorMsg(null);

    try {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      const token = currentSession?.access_token;

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ prompt: prompt.trim(), aspectRatio }),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error ?? "오류가 발생했습니다.");
      } else {
        setResultUrl(json.thumbil.image_url);
      }
    } catch {
      setErrorMsg("네트워크 오류가 발생했습니다.");
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `thumbnail_${Date.now()}.png`;
    a.target = "_blank";
    a.click();
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
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.05]">
          <SparklesSVG className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Thumbnailart
          </span>
        </div>

        <nav className="flex flex-col gap-1 p-3 flex-1">
          {NAV_ITEMS.map((item) => {
            const active = item.href === "/generate";
            return (
              <button
                key={item.label}
                onClick={() => router.push(item.href)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                  active
                    ? "bg-white/[0.07] text-white font-medium"
                    : "text-white/40 hover:bg-white/[0.04] hover:text-white/70"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-white/[0.05] p-3">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
            {avatarUrl ? (
              <img src={avatarUrl} alt={fullName} className="w-7 h-7 rounded-full ring-1 ring-white/10 object-cover" />
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

      {/* Main */}
      <main className="relative z-10 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-8 py-8">

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <WandSVG className="w-5 h-5 text-purple-400" />
              <h1 className="text-xl font-bold text-white">AI 썸네일 생성</h1>
            </div>
            <p className="text-sm text-white/40">
              원하는 장면을 묘사하면 AI가 유튜브 썸네일을 생성합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* Left: Input */}
            <div className="flex flex-col gap-4">

              {/* Prompt */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-white/30">
                  프롬프트
                </label>
                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="원하는 썸네일 장면을 자세하게 묘사하세요&#10;예) 극적인 조명의 스포츠카, 네온 컬러, 역동적인 구도"
                  rows={6}
                  className="w-full resize-none rounded-2xl border border-white/[0.07] bg-[#1f1f1f] px-4 py-3 text-sm text-white/90 placeholder-white/20 outline-none transition-all focus:border-purple-500/50 focus:bg-[#242424]"
                />
                {/* Hint chips */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] text-white/20">예시 클릭 →</span>
                  <div className="flex flex-wrap gap-2">
                    {PROMPT_HINTS.map((hint, i) => (
                      <button
                        key={i}
                        onClick={() => setPrompt(hint)}
                        className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] text-white/40 transition-all hover:border-purple-500/30 hover:text-purple-300 text-left"
                      >
                        {hint.slice(0, 28)}…
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Aspect ratio */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-white/30">
                  비율
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {ASPECT_RATIOS.map((ar) => (
                    <button
                      key={ar.value}
                      onClick={() => setAspectRatio(ar.value)}
                      className={`flex flex-col items-center gap-0.5 rounded-xl border py-3 text-xs transition-all ${
                        aspectRatio === ar.value
                          ? "border-purple-500/60 bg-purple-500/10 text-purple-300"
                          : "border-white/[0.06] bg-[#1f1f1f] text-white/40 hover:border-white/[0.12] hover:text-white/70"
                      }`}
                    >
                      <span className="font-semibold">{ar.label}</span>
                      <span className="text-[10px] opacity-60">{ar.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate button */}
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || generating}
                className="flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/35 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {generating ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    AI가 생성 중입니다…
                  </>
                ) : (
                  <>
                    <WandSVG className="w-4 h-4" />
                    썸네일 생성하기
                  </>
                )}
              </button>

              {/* Error */}
              {errorMsg && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-400">
                  {errorMsg}
                </div>
              )}
            </div>

            {/* Right: Result */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-white/30">
                결과
              </label>

              <div
                className={`relative flex items-center justify-center rounded-2xl border overflow-hidden transition-all ${
                  resultUrl
                    ? "border-purple-500/20 bg-[#1f1f1f]"
                    : "border-white/[0.06] bg-[#1f1f1f]"
                }`}
                style={{ aspectRatio: aspectRatio.replace(":", "/"), minHeight: 200 }}
              >
                {generating && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#1f1f1f]">
                    <div className="relative">
                      <SparklesSVG className="w-10 h-10 text-purple-400 animate-pulse" />
                      <div className="absolute inset-0 animate-ping opacity-20">
                        <SparklesSVG className="w-10 h-10 text-purple-400" />
                      </div>
                    </div>
                    <span className="text-xs text-white/30">이미지를 생성하는 중…</span>
                    <span className="text-[10px] text-white/20">약 15~30초 소요됩니다</span>
                  </div>
                )}

                {!generating && !resultUrl && (
                  <div className="flex flex-col items-center gap-2 text-white/20 select-none">
                    <ImageSVG className="w-10 h-10" />
                    <span className="text-xs">여기에 결과가 표시됩니다</span>
                  </div>
                )}

                {!generating && resultUrl && (
                  <img
                    src={resultUrl}
                    alt="Generated thumbnail"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Download */}
              {resultUrl && !generating && (
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 text-sm text-white/70 transition-all hover:bg-white/[0.08] hover:text-white"
                >
                  <DownloadSVG className="w-4 h-4" />
                  다운로드
                </button>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
