"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface MusicalPosterCardProps {
  posterSrc: string;
  title: string;
  date: string;
  venue: string;
  review: string;
}

export default function MusicalPosterCard({
  posterSrc,
  title,
  date,
  venue,
  review,
}: MusicalPosterCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);

      // 3초 후 자동으로 앞면으로 되돌리기
      timerRef.current = setTimeout(() => {
        setIsFlipped(false);
      }, 3000);
    } else {
      // 이미 뒤집힌 상태에서 클릭하면 즉시 앞면으로
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setIsFlipped(false);
    }
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative aspect-[2/3] cursor-pointer"
      onClick={handleClick}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
        }}
      >
        {/* 앞면 - 포스터 이미지 */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src={posterSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* 뒷면 - 정보 */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-900 to-pink-900 rounded-lg shadow-lg p-6 flex flex-col justify-center items-center text-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h3 className="text-white text-2xl font-bold mb-4">{title}</h3>
          <div className="text-purple-200 text-sm mb-2">
            <p>{date}</p>
            <p>{venue}</p>
          </div>
          <div className="mt-4 text-white text-sm leading-relaxed">
            <p>{review}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
