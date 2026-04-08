"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

// ── Types ────────────────────────────────────────────────────────────────────

interface Thumbil {
  id: string;
  prompt: string | null;
  image_path: string | null;
  image_url: string | null;
  status: string;
  created_at: string;
}

// ── SVG Icons ────────────────────────────────────────────────────────────────

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

function TrashSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function XSVGIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ── Nav items ─────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: <HomeSVG className="w-4 h-4" />,     label: "홈",        href: "/dashboard" },
  { icon: <WandSVG className="w-4 h-4" />,     label: "AI 생성",   href: "/generate" },
  { icon: <ImageSVG className="w-4 h-4" />,    label: "내 썸네일", href: "/thumbnails" },
  { icon: <SettingsSVG className="w-4 h-4" />, label: "설정",      href: "/settings" },
];

// ── Skeleton card ─────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-white/[0.05] bg-white/[0.02] overflow-hidden animate-pulse">
      <div className="aspect-video bg-white/[0.04]" />
      <div className="px-3 pb-3 flex flex-col gap-1.5">
        <div className="h-3 w-3/4 rounded bg-white/[0.06]" />
        <div className="h-2.5 w-1/2 rounded bg-white/[0.04]" />
      </div>
    </div>
  );
}

// ── Image modal ───────────────────────────────────────────────────────────────

function ImageModal({ thumbil, onClose, onDelete }: {
  thumbil: Thumbil;
  onClose: () => void;
  onDelete: (id: string) => void;
}) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!thumbil.image_url || downloading) return;
    setDownloading(true);
    try {
      const res = await fetch(thumbil.image_url);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `thumbnail_${thumbil.id}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Modal */}
      <div
        className="relative z-10 flex flex-col gap-4 w-full max-w-2xl rounded-3xl border border-white/[0.08] p-4"
        style={{
          background: "rgba(26,26,26,0.85)",
          backdropFilter: "blur(32px) saturate(1.6)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04) inset, 0 32px 64px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] text-white/50 hover:bg-white/[0.12] hover:text-white transition-all"
        >
          <XSVGIcon className="w-3.5 h-3.5" />
        </button>

        {/* Image */}
        <img
          src={thumbil.image_url!}
          alt={thumbil.prompt ?? "thumbnail"}
          className="w-full rounded-xl object-cover"
        />

        {/* Prompt */}
        {thumbil.prompt && (
          <p className="text-xs text-white/40 leading-relaxed px-1 line-clamp-2">
            {thumbil.prompt}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.04] py-2.5 text-sm text-white/70 transition-all hover:bg-white/[0.08] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white/70" />
            ) : (
              <DownloadSVG className="w-4 h-4" />
            )}
            {downloading ? "다운로드 중..." : "다운로드"}
          </button>
          <button
            onClick={() => { onDelete(thumbil.id); onClose(); }}
            className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-2.5 text-sm text-red-400/80 transition-all hover:bg-red-500/[0.12] hover:text-red-400"
          >
            <TrashSVG className="w-4 h-4" />
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ThumbnailsPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const [thumbils, setThumbils]       = useState<Thumbil[]>([]);
  const [fetching, setFetching]       = useState(true);
  const [selected, setSelected]       = useState<Thumbil | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace("/auth");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;

    const fetchThumbs = async () => {
      setFetching(true);
      const { data } = await supabase
        .from("thumbils")
        .select("id, prompt, image_path, image_url, status, created_at")
        .eq("user_id", user.id)
        .eq("status", "completed")
        .order("created_at", { ascending: false });

      setThumbils(data ?? []);
      setFetching(false);
    };

    fetchThumbs();

    // 실시간 구독: 새 이미지 생성 시 자동 반영
    const channel = supabase
      .channel("thumbils-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "thumbils", filter: `user_id=eq.${user.id}` },
        () => fetchThumbs()
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const handleDelete = async (id: string) => {
    const target = thumbils.find((t) => t.id === id);
    // Storage 파일 삭제
    if (target?.image_path) {
      await supabase.storage.from("images").remove([target.image_path]);
    }
    // DB 레코드 삭제
    await supabase.from("thumbils").delete().eq("id", id);
    setThumbils((prev) => prev.filter((t) => t.id !== id));
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: "#181818" }}>
        <SparklesSVG className="w-8 h-8 text-purple-400 animate-pulse" />
      </div>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const fullName  = (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "사용자";
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
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.05]">
          <SparklesSVG className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Thumbnailart
          </span>
        </div>

        <nav className="flex flex-col gap-1 p-3 flex-1">
          {NAV_ITEMS.map((item) => {
            const active = item.href === "/thumbnails";
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
        <div className="mx-auto max-w-5xl px-8 py-8">

          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ImageSVG className="w-5 h-5 text-indigo-400" />
                <h1 className="text-xl font-bold text-white">내 썸네일</h1>
                {!fetching && (
                  <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs text-white/40">
                    {thumbils.length}개
                  </span>
                )}
              </div>
              <p className="text-sm text-white/40">생성한 썸네일을 모아볼 수 있습니다.</p>
            </div>
            <button
              onClick={() => router.push("/generate")}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/35 hover:scale-[1.02] active:scale-[0.98]"
            >
              <WandSVG className="w-4 h-4" />
              새로 생성
            </button>
          </div>

          {/* Gallery */}
          {fetching ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : thumbils.length === 0 ? (
            /* Empty state */
            <div
              className="flex flex-col items-center justify-center gap-5 rounded-3xl border border-dashed border-white/[0.07] py-24"
              style={{
                background: "rgba(32,32,32,0.5)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03]">
                <ImageSVG className="w-8 h-8 text-white/20" />
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <p className="text-sm font-medium text-white/50">아직 생성한 썸네일이 없어요</p>
                <p className="text-xs text-white/25">AI로 첫 번째 썸네일을 만들어 보세요!</p>
              </div>
              <button
                onClick={() => router.push("/generate")}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02]"
              >
                <WandSVG className="w-4 h-4" />
                AI 썸네일 생성하기
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {thumbils.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelected(t)}
                  className="group flex flex-col gap-0 rounded-2xl border border-white/[0.05] overflow-hidden text-left transition-all hover:border-white/[0.12] hover:scale-[1.01]"
                  style={{
                    background: "rgba(30,30,30,0.7)",
                    backdropFilter: "blur(12px) saturate(1.4)",
                    boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset",
                  }}
                >
                  {/* Thumbnail image */}
                  <div className="relative aspect-video overflow-hidden bg-white/[0.03]">
                    <img
                      src={t.image_url!}
                      alt={t.prompt ?? "thumbnail"}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/30">
                      <div className="scale-90 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                        <div
                          className="rounded-full px-3 py-1.5 text-xs font-medium text-white"
                          style={{
                            background: "rgba(255,255,255,0.12)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255,255,255,0.15)",
                          }}
                        >
                          크게 보기
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-0.5 px-3 py-2.5">
                    <p className="text-xs text-white/60 line-clamp-1">
                      {t.prompt ?? "제목 없음"}
                    </p>
                    <p className="text-[10px] text-white/25">
                      {new Date(t.created_at).toLocaleDateString("ko-KR", {
                        month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                      })}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {selected && (
        <ImageModal
          thumbil={selected}
          onClose={() => setSelected(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
