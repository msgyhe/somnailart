"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Template {
  id: string;
  title: string;
  prompt: string;
  accent: string;
}

interface Genre {
  id: string;
  label: string;
  icon: string;
  accent: string;
  templates: Template[];
}

// ── Template Data ─────────────────────────────────────────────────────────────

const GENRES: Genre[] = [
  {
    id: "gaming",
    label: "게임",
    icon: "🎮",
    accent: "#6366f1",
    templates: [
      {
        id: "gaming-1",
        title: "보스 대결",
        prompt: "웅장한 판타지 게임 썸네일: 빛나는 갑옷을 입은 전사가 거대하고 어두운 보스 몬스터와 대결하는 장면, 주황색과 보라색 에너지 빔의 극적인 조명, 영화 같은 구도, 강렬한 전투 분위기, 유튜브 게임 채널 스타일",
        accent: "#6366f1",
      },
      {
        id: "gaming-2",
        title: "배틀로얄 생존",
        prompt: "배틀로얄 게임 썸네일: 폐허가 된 도시에 서 있는 마지막 생존자, 배경에 좁혀오는 폭풍, 무기를 들고 승리하는 캐릭터, 공중에 떠다니는 먼지와 파편, 고대비 극적인 조명, 최후의 승자 화면 스타일",
        accent: "#6366f1",
      },
      {
        id: "gaming-3",
        title: "세계 신기록 달성",
        prompt: "스피드런 기록 유튜브 썸네일: 모션 블러 효과와 함께 극한의 속도로 달리는 레트로 게임 캐릭터, 기록 시간을 보여주는 타이머, 충격받은 표정 이모지 오버레이, 밝은 네온 초록색과 노란색, 픽셀 아트 요소",
        accent: "#6366f1",
      },
      {
        id: "gaming-4",
        title: "공포 게임 도전",
        prompt: "공포 게임 썸네일: 어두운 으스스한 복도에서 그림자 속에 희미하게 보이는 무서운 몬스터, 손전등을 들고 충격받은 표정의 캐릭터, 핏빛 빨간 제목 텍스트, 안개 낀 분위기, 점프 스케어 스타일 구도",
        accent: "#6366f1",
      },
    ],
  },
  {
    id: "tech",
    label: "테크 / IT",
    icon: "💻",
    accent: "#0ea5e9",
    templates: [
      {
        id: "tech-1",
        title: "AI 기술 리뷰",
        prompt: "테크 리뷰 유튜브 썸네일: 파란색과 흰색 빛으로 빛나는 미래형 AI 로봇 또는 홀로그래픽 인터페이스, 회로 기판 패턴, 깔끔한 미니멀 배경, 전문 테크 채널 스타일, 고품질 제품 촬영",
        accent: "#0ea5e9",
      },
      {
        id: "tech-2",
        title: "최신 스마트폰 언박싱",
        prompt: "스마트폰 언박싱 썸네일: 부드러운 스튜디오 조명 아래 개봉된 박스 위에 떠 있는 세련된 프리미엄 폰, 반사 표면, 미묘한 그라데이션의 깨끗한 흰색 배경, 제품 사진 스타일, 럭셔리한 느낌",
        accent: "#0ea5e9",
      },
      {
        id: "tech-3",
        title: "코딩 튜토리얼",
        prompt: "코딩 튜토리얼 유튜브 썸네일: 구문 강조 표시가 있는 화려한 코드 에디터를 보여주는 노트북 화면, 다크 테마, 키보드 옆 커피잔, 현대적인 작업 공간의 부드러운 보케 배경, 개발자 감성",
        accent: "#0ea5e9",
      },
      {
        id: "tech-4",
        title: "사이버보안 해킹",
        prompt: "사이버보안 유튜브 썸네일: 매트릭스 코드가 나타나는 여러 모니터가 있는 어두운 방의 해커 실루엣, 화면의 빨간 경고 알림, 후드를 쓴 인물, 극적인 빨간색과 초록색 조명, 스릴러 영화 스타일",
        accent: "#0ea5e9",
      },
    ],
  },
  {
    id: "food",
    label: "요리 / 음식",
    icon: "🍳",
    accent: "#f59e0b",
    templates: [
      {
        id: "food-1",
        title: "레스토랑 음식 클로즈업",
        prompt: "음식 유튜브 썸네일: 김이 오르는 고메 요리의 극단적인 클로즈업, 녹아내리는 치즈 스트레치, 선명한 색상, 어두운 슬레이트 위 완벽한 플레이팅, 얕은 피사계 심도와 보케, ASMR 음식 사진 스타일",
        accent: "#f59e0b",
      },
      {
        id: "food-2",
        title: "간단 홈쿡 레시피",
        prompt: "홈쿡 레시피 썸네일: 밝고 활기찬 주방 배경, 아름답게 배열된 알록달록한 신선한 재료들, 음식을 준비하는 손, 따뜻한 자연 조명, 깨끗한 흰색 조리대, 아늑하고 매력적인 분위기",
        accent: "#f59e0b",
      },
      {
        id: "food-3",
        title: "길거리 음식 탐방",
        prompt: "길거리 음식 투어 썸네일: 알록달록한 포장마차가 즐비한 야시장 장면, 전경의 김 오르는 꼬치 구이, 신나게 먹는 관광객, 따뜻한 노란색 등불 조명, 생동감 있고 에너지 넘치는 분위기",
        accent: "#f59e0b",
      },
      {
        id: "food-4",
        title: "먹방 대용량",
        prompt: "먹방 유튜브 썸네일: 테이블 위에 가득 펼쳐진 다양한 한국 음식들, 엄청난 양, 알록달록한 음식 배열, 김이 모락모락 나는 메인 요리 클로즈업, 신나게 먹는 표정, 밝고 따뜻한 조명",
        accent: "#f59e0b",
      },
    ],
  },
  {
    id: "travel",
    label: "여행 / 브이로그",
    icon: "✈️",
    accent: "#14b8a6",
    templates: [
      {
        id: "travel-1",
        title: "이국적인 해변",
        prompt: "여행 브이로그 썸네일: 황금 시간대의 아름다운 열대 해변, 맑고 투명한 청록색 바다, 하얀 모래, 야자수 실루엣, 두 팔을 벌리고 기쁨에 서 있는 여행자, 영화 같은 광각 촬영, 천국 같은 분위기",
        accent: "#14b8a6",
      },
      {
        id: "travel-2",
        title: "도시 야경 탐험",
        prompt: "도시 탐험 유튜브 썸네일: 빛나는 조명과 함께 밤의 상징적인 도시 스카이라인, 도심 거리의 네온사인, 활기찬 군중 속을 걷는 여행자, 영화 같은 구도, 여행 다큐멘터리 스타일",
        accent: "#14b8a6",
      },
      {
        id: "travel-3",
        title: "산악 어드벤처",
        prompt: "산악 어드벤처 썸네일: 일출 때 구름 위의 드라마틱한 바위 정상에 선 등산객, 구름을 뚫고 비치는 황금빛 광선, 웅장한 경관, 성취감과 자유로움, 내셔널 지오그래픽 사진 스타일",
        accent: "#14b8a6",
      },
      {
        id: "travel-4",
        title: "일본 벚꽃 여행",
        prompt: "일본 여행 브이로그 썸네일: 전경에 만개한 벚꽃이 있는 후지산, 전통 빨간 도리이 게이트, 부드럽게 떨어지는 분홍 꽃잎, 고요하고 아름다운 일본 풍경, 여행 엽서 구도",
        accent: "#14b8a6",
      },
    ],
  },
  {
    id: "beauty",
    label: "뷰티 / 패션",
    icon: "💄",
    accent: "#ec4899",
    templates: [
      {
        id: "beauty-1",
        title: "메이크업 변신",
        prompt: "뷰티 튜토리얼 유튜브 썸네일: 화려한 메이크업 변신 전후 비교 화면, 전문 스튜디오 조명, 드라마틱한 아이 메이크업으로 완벽한 피부, 주변에 흩어진 럭셔리 화장품, 핑크와 골드 감성",
        accent: "#ec4899",
      },
      {
        id: "beauty-2",
        title: "스킨케어 루틴",
        prompt: "스킨케어 루틴 썸네일: 빛나는 건강한 피부 클로즈업, 깨끗한 흰색 배경에 물방울이 맺힌 세럼과 보습제, 신선하고 촉촉한 피부 질감, 미니멀 K-뷰티 감성, 부드러운 핑크와 흰색 톤",
        accent: "#ec4899",
      },
      {
        id: "beauty-3",
        title: "쇼핑 하울",
        prompt: "패션 하울 유튜브 썸네일: 깔끔한 배경에 가지런히 배열된 여러 의류 아이템의 세련된 플랫레이, 쇼핑백, 트렌디한 액세서리, 밝은 파스텔 색상, 패션 매거진 에디토리얼 스타일",
        accent: "#ec4899",
      },
      {
        id: "beauty-4",
        title: "헤어 스타일링",
        prompt: "헤어 스타일링 튜토리얼 썸네일: 헝클어진 머리에서 멋지게 스타일된 헤어로의 극적인 변신, 살롱 수준의 결과물, 완벽한 하이라이트와 함께 아름답게 흐르는 머릿결, 전문 조명, 럭셔리 헤어케어 감성",
        accent: "#ec4899",
      },
    ],
  },
  {
    id: "sports",
    label: "스포츠 / 피트니스",
    icon: "💪",
    accent: "#f97316",
    templates: [
      {
        id: "sports-1",
        title: "헬스 운동 루틴",
        prompt: "피트니스 운동 썸네일: 현대적인 헬스장에서 역동적인 운동 자세를 취한 운동선수, 극적인 조명으로 강조된 강한 근육, 동기부여 에너지, 땀과 결의, 스포츠 사진 스타일, 주황색과 검은색 톤",
        accent: "#f97316",
      },
      {
        id: "sports-2",
        title: "경기 하이라이트",
        prompt: "스포츠 하이라이트 썸네일: 승리의 절정 순간에 있는 선수, 공중에 떠 있는 공 또는 결승선 통과, 배경에 흐릿한 경기장 관중, 드라마틱한 프리즈 프레임 샷, ESPN 스타일 스포츠 방송 그래픽",
        accent: "#f97316",
      },
      {
        id: "sports-3",
        title: "몸매 변신 스토리",
        prompt: "바디 트랜스포메이션 유튜브 썸네일: 나란히 놓인 극적인 변신 전후 체형 비교, 근육 윤곽을 보여주는 강한 조명, 동기부여 피트니스 여정, 빨간색과 검은색 굵은 색상 조합",
        accent: "#f97316",
      },
      {
        id: "sports-4",
        title: "익스트림 스포츠",
        prompt: "아웃도어 익스트림 스포츠 썸네일: 황금빛 석양을 배경으로 거대한 파도를 타는 서퍼, 또는 도시 스카이라인을 배경으로 묘기를 부리는 스케이터, 동작이 멈춘 순간, 선명하게 채도 높은 색상, 익스트림 스포츠 매거진 커버 스타일",
        accent: "#f97316",
      },
    ],
  },
  {
    id: "education",
    label: "교육 / 지식",
    icon: "📚",
    accent: "#a855f7",
    templates: [
      {
        id: "edu-1",
        title: "역사 다큐멘터리",
        prompt: "역사 다큐멘터리 유튜브 썸네일: 웅장한 건축물이 있는 드라마틱한 고대 문명 장면, 전사들 또는 역사적 인물들, 오래된 양피지 질감 오버레이, 영화 포스터 같은 구도, 히스토리 채널 스타일",
        accent: "#a855f7",
      },
      {
        id: "edu-2",
        title: "신기한 과학 실험",
        prompt: "과학 실험 썸네일: 비커 속 거품이 나는 빛나는 액체의 화려한 화학 반응, 실험실 배경, 경이로운 표정의 과학자, 빛나는 실험에서 나오는 극적인 조명, 교육 유튜브 스타일",
        accent: "#a855f7",
      },
      {
        id: "edu-3",
        title: "외국어 학습",
        prompt: "언어 학습 썸네일: 다양한 언어로 된 말풍선이 떠다니는 세계 지도, 알록달록한 국기들, 친근한 선생님 표정, 밝고 흥미로운 교육적 디자인, 다국어 채널 스타일",
        accent: "#a855f7",
      },
      {
        id: "edu-4",
        title: "우주 천문학",
        prompt: "우주 천문학 유튜브 썸네일: 성운 색상이 아름다운 멋진 은하, 극적인 조명의 전경 행성, 우주에 떠 있는 우주비행사, NASA 스타일 사진, 깊은 보라색과 파란색 우주 배경",
        accent: "#a855f7",
      },
    ],
  },
  {
    id: "music",
    label: "음악 / 엔터테인먼트",
    icon: "🎵",
    accent: "#f43f5e",
    templates: [
      {
        id: "music-1",
        title: "라이브 공연 무대",
        prompt: "뮤직 커버 유튜브 썸네일: 극적인 스포트라이트 아래 무대에서 공연하는 아티스트, 아래 콘서트 관중 실루엣, 마이크를 손에 들고, 스모크 효과와 화려한 무대 조명, 뮤직비디오 감성",
        accent: "#f43f5e",
      },
      {
        id: "music-2",
        title: "감성 플레이리스트",
        prompt: "음악 플레이리스트 유튜브 썸네일: 화려한 추상 아트가 담긴 바이닐 레코드, 깨끗한 배경의 헤드폰, 떠다니는 음표들, 따뜻한 빈티지 톤의 로파이 감성, 아늑하고 편안한 음악 채널 스타일",
        accent: "#f43f5e",
      },
      {
        id: "music-3",
        title: "반응 영상",
        prompt: "리액션 영상 유튜브 썸네일: 믿을 수 없는 것을 보며 극도로 충격받고 놀란 표정의 사람, 입을 크게 벌리고 눈을 크게 뜬 모습, 떠다니는 이모지 반응과 함께 화려한 배경, 리액션 채널 스타일",
        accent: "#f43f5e",
      },
      {
        id: "music-4",
        title: "K-POP 리뷰",
        prompt: "케이팝 리뷰 유튜브 썸네일: 관중의 화려한 응원봉이 가득한 생동감 있는 케이팝 콘서트 무대, 아이돌 퍼포먼스 프리즈 프레임, 무대 조명과 색종이 속 역동적인 아이돌 포즈, 한국 팝 음악 감성",
        accent: "#f43f5e",
      },
    ],
  },
];

// ── SVG Icons ─────────────────────────────────────────────────────────────────

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

// ── Nav ───────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: <HomeSVG className="w-4 h-4" />,     label: "홈",        href: "/dashboard" },
  { icon: <WandSVG className="w-4 h-4" />,     label: "AI 생성",   href: "/generate" },
  { icon: <ImageSVG className="w-4 h-4" />,    label: "내 썸네일", href: "/thumbnails" },
  { icon: <SettingsSVG className="w-4 h-4" />, label: "설정",      href: "/settings" },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TemplatesPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [activeGenre, setActiveGenre] = useState<string>("gaming");

  useEffect(() => {
    if (!loading && !user) router.replace("/auth");
  }, [user, loading, router]);

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

  const currentGenre = GENRES.find((g) => g.id === activeGenre)!;

  const handleTemplateClick = (prompt: string) => {
    router.push(`/generate?prompt=${encodeURIComponent(prompt)}`);
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

      {/* Left nav sidebar */}
      <aside className="relative z-10 flex w-60 flex-shrink-0 flex-col border-r border-white/[0.05] bg-[#141414]/80 backdrop-blur-sm">
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.05]">
          <SparklesSVG className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Thumbnailart
          </span>
        </div>

        <nav className="flex flex-col gap-1 p-3 flex-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.href)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/40 transition-all hover:bg-white/[0.04] hover:text-white/70"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
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
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <SparklesSVG className="w-5 h-5 text-pink-400" />
              <h1 className="text-xl font-bold text-white">스타일 템플릿</h1>
            </div>
            <p className="text-sm text-white/40">
              장르를 선택하고 템플릿을 클릭하면 바로 생성 페이지로 이동합니다.
            </p>
          </div>

          {/* Genre tabs */}
          <div className="mb-6 flex flex-wrap gap-2">
            {GENRES.map((genre) => {
              const active = genre.id === activeGenre;
              return (
                <button
                  key={genre.id}
                  onClick={() => setActiveGenre(genre.id)}
                  className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all"
                  style={
                    active
                      ? {
                          borderColor: `${genre.accent}60`,
                          background: `${genre.accent}18`,
                          color: genre.accent,
                        }
                      : {
                          borderColor: "rgba(255,255,255,0.06)",
                          background: "rgba(255,255,255,0.02)",
                          color: "rgba(255,255,255,0.4)",
                        }
                  }
                >
                  <span>{genre.icon}</span>
                  {genre.label}
                </button>
              );
            })}
          </div>

          {/* Template cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {currentGenre.templates.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => handleTemplateClick(tmpl.prompt)}
                className="group relative flex flex-col gap-3 rounded-2xl border border-white/[0.06] p-5 text-left transition-all hover:border-white/[0.12] hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  background: "rgba(28,28,28,0.8)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset",
                }}
              >
                {/* Accent glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle at 20% 50%, ${currentGenre.accent}10, transparent 60%)` }}
                />

                {/* Header row */}
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-xl text-lg"
                      style={{ background: `${currentGenre.accent}18`, border: `1px solid ${currentGenre.accent}30` }}
                    >
                      {currentGenre.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white/90">{tmpl.title}</p>
                      <p className="text-[10px]" style={{ color: currentGenre.accent }}>{currentGenre.label}</p>
                    </div>
                  </div>

                  {/* Use button */}
                  <div
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium opacity-0 transition-all group-hover:opacity-100"
                    style={{
                      background: `${currentGenre.accent}22`,
                      color: currentGenre.accent,
                      border: `1px solid ${currentGenre.accent}30`,
                    }}
                  >
                    <WandSVG className="w-3 h-3" />
                    사용하기
                  </div>
                </div>

                {/* Prompt preview */}
                <p className="relative text-xs text-white/35 leading-relaxed line-clamp-3">
                  {tmpl.prompt}
                </p>
              </button>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
