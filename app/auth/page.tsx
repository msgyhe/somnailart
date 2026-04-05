"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import ShineBorder from "@/components/main/hero/shine-border";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

const HeroCanvas = dynamic(() => import("@/components/main/hero/canvas"), { ssr: false });

function SparklesSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z" fill="currentColor" />
      <path d="M19 3L19.75 5.25L22 6L19.75 6.75L19 9L18.25 6.75L16 6L18.25 5.25L19 3Z" fill="currentColor" opacity="0.7" />
      <path d="M5 14L5.5 15.5L7 16L5.5 16.5L5 18L4.5 16.5L3 16L4.5 15.5L5 14Z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function GoogleSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, authLoading, router]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
      <HeroCanvas />

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <ShineBorder
          borderRadius={20}
          borderWidth={1}
          duration={10}
          color={["#a855f7", "#6366f1", "#ec4899"]}
          className="!bg-black/70 p-8 backdrop-blur-xl"
        >
          {/* Brand */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="flex items-center gap-2">
              <SparklesSVG className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                Thumbnailart
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              로그인
            </h2>
            <p className="text-sm text-white/40">
              AI 썸네일 생성을 시작하세요
            </p>
          </div>

          {/* Social Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <GoogleSVG className="w-5 h-5" />
            {loading ? "잠시만 기다려주세요..." : "Google로 계속하기"}
          </button>

          <p className="mt-6 text-center text-xs text-white/30">
            로그인 시{" "}
            <button type="button" className="text-purple-400/80 hover:text-purple-400 transition-colors">
              이용약관
            </button>
            {" "}및{" "}
            <button type="button" className="text-purple-400/80 hover:text-purple-400 transition-colors">
              개인정보처리방침
            </button>
            에 동의하게 됩니다.
          </p>
        </ShineBorder>
      </div>
    </section>
  );
}
