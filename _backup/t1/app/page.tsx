"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PhotoGrid from "@/components/PhotoGrid";
import ImageModal from "@/components/ImageModal";
import Footer from "@/components/Footer";
import ActorVideoCard from "@/components/ActorVideoCard";
import MusicalPosterCard from "@/components/MusicalPosterCard";

// ============================================
// 여기를 수정하세요! (개인 정보)
// ============================================
const myInfo = {
  name: "김예지",
  tagline: "뮤지컬을 사랑하는 RSGIS 전임",
  email: "yeji.kim@example.com",
  greeting: "안녕하세요!",
  description:
    "저는 비엔티 RSGIS 부서에서 근무하는 김예지입니다. 업무 외 시간에는 뮤지컬 관람을 즐기며, 공연 예술을 통해 영감을 얻고 있습니다. 이 포트폴리오는 제 관심사와 경험을 담은 공간입니다.",
  highlights: [
    "뮤지컬 관람",
    "공연 예술 탐구",
    "GIS 기술 연구",
  ],
  socialLinks: {
    instagram: "https://instagram.com",
    github: "https://github.com",
  },
};

// ============================================
// 좋아하는 배우 데이터
// ============================================
const actors = [
  {
    name: "김소현",
    videoSrc: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    posterSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    role: "레베카 - 댄버스 역",
  },
  {
    name: "박강현",
    videoSrc: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    posterSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    role: "팬텀 - 팬텀 역",
  },
  {
    name: "옥주현",
    videoSrc: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    posterSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
    role: "엘리자벳 - 엘리자벳 역",
  },
  {
    name: "홍광호",
    videoSrc: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    posterSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
    role: "지킬 앤 하이드 - 하이드 역",
  },
];

// ============================================
// 관람한 뮤지컬 포스터 데이터 (사진 첨부 예정)
// ============================================
const musicalPosters = [
  {
    posterSrc: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&q=80",
    title: "오페라의 유령",
    date: "2024.03.15",
    venue: "블루스퀘어",
    review: "환상적인 무대와 음악이 잊을 수 없는 감동을 선사했습니다.",
  },
  {
    posterSrc: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=600&q=80",
    title: "데스노트",
    date: "2024.04.20",
    venue: "샬롯데씨어터",
    review: "긴장감 넘치는 스토리와 강렬한 음악이 압도적이었어요.",
  },
  {
    posterSrc: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&q=80",
    title: "디어 에반 핸슨",
    date: "2024.05.10",
    venue: "블루스퀘어",
    review: "진솔한 감정 전달이 가슴 깊이 와닿았습니다.",
  },
  {
    posterSrc: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=600&q=80",
    title: "프랑켄슈타인",
    date: "2024.06.22",
    venue: "세종문화회관",
    review: "철학적 깊이와 웅장한 넘버들이 인상적이었어요.",
  },
  {
    posterSrc: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
    title: "하데스타운",
    date: "2024.07.15",
    venue: "LG아트센터",
    review: "재즈 선율과 현대적 해석이 매력적인 작품이었습니다.",
  },
  {
    posterSrc: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80",
    title: "지킬 앤 하이드",
    date: "2024.08.12",
    venue: "블루스퀘어",
    review: "이중인격을 표현하는 배우의 연기가 소름 돋았습니다.",
  },
  {
    posterSrc: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=600&q=80",
    title: "시라노",
    date: "2024.09.03",
    venue: "디큐브아트센터",
    review: "아름다운 사랑 이야기와 감동적인 음악이 완벽했어요.",
  },
  {
    posterSrc: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80",
    title: "웃는 남자",
    date: "2024.10.08",
    venue: "샬롯데씨어터",
    review: "독창적인 스토리와 화려한 무대가 인상 깊었습니다.",
  },
  {
    posterSrc: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    title: "멤피스",
    date: "2024.11.14",
    venue: "세종문화회관",
    review: "소울풀한 음악과 에너지가 넘치는 공연이었어요.",
  },
  {
    posterSrc: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&q=80",
    title: "알라딘",
    date: "2024.12.20",
    venue: "블루스퀘어",
    review: "마법 같은 무대와 즐거운 넘버들이 행복을 선사했습니다.",
  },
  {
    posterSrc: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=600&q=80",
    title: "물랑루즈",
    date: "2025.01.18",
    venue: "LG아트센터",
    review: "화려함의 극치! 눈과 귀가 모두 즐거운 공연이었어요.",
  },
  {
    posterSrc: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&q=80",
    title: "한복 입은 남자",
    date: "2025.02.05",
    venue: "디큐브아트센터",
    review: "한국적 정서와 현대적 감각이 조화를 이룬 작품이었습니다.",
  },
];

// ============================================
// 그 외 관람한 뮤지컬 (목록만)
// ============================================
const otherMusicals = [
  "몬테크리스토",
  "그레이트 코멧",
  "베르사유의 장미",
  "4월은 너의 거짓말",
  "이매지너리",
  "보니앤클라이드",
  "라이프 오브 파이",
];

// ============================================
// 이미지 설정 (Unsplash 샘플 이미지 사용)
// 나중에 public 폴더에 본인 사진을 넣고 경로를 바꾸세요
// 예: "/my-photo.jpg"
// ============================================
const images = {
  hero: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
  profile: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80",
  travel: [
    {
      src: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80",
      alt: "뮤지컬 공연장",
      caption: "화려한 무대 조명",
    },
    {
      src: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800&q=80",
      alt: "공연 관람",
      caption: "감동적인 순간들",
    },
    {
      src: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&q=80",
      alt: "극장 내부",
      caption: "아름다운 극장 풍경",
    },
    {
      src: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800&q=80",
      alt: "무대 예술",
      caption: "예술의 향연",
    },
    {
      src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
      alt: "공연장 풍경",
      caption: "기대되는 공연",
    },
    {
      src: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
      alt: "무대 뒤",
      caption: "공연의 감동",
    },
  ],
  photos: [
    {
      src: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&q=80",
      alt: "업무 공간",
      caption: "RSGIS 프로젝트 작업 중",
    },
    {
      src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
      alt: "여유로운 시간",
      caption: "휴식의 순간",
    },
    {
      src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
      alt: "일상",
      caption: "소중한 일상의 기록",
    },
  ],
};

// ============================================
// 메인 페이지 컴포넌트
// ============================================
export default function Home() {
  const [modalImage, setModalImage] = useState<{
    src: string;
    alt: string;
    caption?: string;
  } | null>(null);

  const handlePhotoClick = (photo: { src: string; alt: string; caption?: string }) => {
    setModalImage(photo);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <HeroSection
        name={myInfo.name}
        tagline={myInfo.tagline}
        backgroundImage={images.hero}
      />

      <AboutSection
        profileImage={images.profile}
        greeting={myInfo.greeting}
        description={myInfo.description}
        highlights={myInfo.highlights}
      />

      {/* 좋아하는 배우 섹션 */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Favorite Actors</h2>
          <p className="text-center text-neutral-600 mb-12">제가 사랑하는 뮤지컬 배우들입니다</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {actors.map((actor, index) => (
              <ActorVideoCard key={index} {...actor} />
            ))}
          </div>
        </div>
      </section>

      {/* 관람한 뮤지컬 포스터 섹션 */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">My Musicals</h2>
          <p className="text-center text-neutral-600 mb-12">지금까지 관람한 뮤지컬들입니다</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {musicalPosters.map((poster, index) => (
              <MusicalPosterCard key={index} {...poster} />
            ))}
          </div>
        </div>
      </section>

      {/* 그 외 관람한 뮤지컬 섹션 */}
      <section className="py-12 px-6 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6 text-neutral-700">그 외</h3>
          <p className="text-center text-neutral-600 text-lg">
            {otherMusicals.join(" | ")}
          </p>
        </div>
      </section>

      <div className="bg-white">
        <PhotoGrid
          id="moments"
          title="Moments"
          subtitle="일상의 소중한 순간들"
          photos={images.photos}
          onPhotoClick={handlePhotoClick}
        />
      </div>

      <Footer
        name={myInfo.name}
        email={myInfo.email}
        socialLinks={myInfo.socialLinks}
      />

      <ImageModal
        isOpen={modalImage !== null}
        imageSrc={modalImage?.src || ""}
        imageAlt={modalImage?.alt || ""}
        caption={modalImage?.caption}
        onClose={handleCloseModal}
      />
    </div>
  );
}
