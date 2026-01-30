"use client";

import { useRef } from "react";

interface ActorVideoCardProps {
  name: string;
  videoSrc: string;
  posterSrc?: string;
  role?: string;
}

export default function ActorVideoCard({
  name,
  videoSrc,
  posterSrc,
  role,
}: ActorVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-neutral-900"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="aspect-[3/4] relative">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-white text-xl font-bold mb-1">{name}</h3>
        {role && (
          <p className="text-neutral-300 text-sm">{role}</p>
        )}
      </div>
    </div>
  );
}
