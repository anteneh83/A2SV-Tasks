"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  // Generate sparkle data only once on client to avoid hydration mismatch
  const [sparkles, setSparkles] = useState<
    {
      width: number;
      height: number;
      top: number;
      left: number;
      animationDelay: number;
      animationDuration: number;
    }[]
  >([]);

  useEffect(() => {
    const generatedSparkles = Array.from({ length: 20 }).map(() => ({
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      animationDelay: Math.random() * 5,
      animationDuration: 5 + Math.random() * 5,
    }));
    setSparkles(generatedSparkles);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-6 py-12">
      {/* Large 404 with responsive font sizes */}
      <h1
        className={`font-extrabold drop-shadow-lg animate-pulse select-none
          text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] leading-none`}
      >
        404
      </h1>

      {/* Subtitle */}
      <p className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 tracking-wide drop-shadow-md text-center">
        Ooops! Page Not Found
      </p>

      {/* Description */}
      <p className="max-w-md sm:max-w-lg md:max-w-xl text-center mb-8 sm:mb-10 text-base sm:text-lg md:text-xl drop-shadow-sm">
        The page you are looking for doesn’t exist or has been moved. Try going
        back to the homepage.
      </p>

      {/* Back Home Button */}
      <button
        onClick={() => router.push("/")}
        className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white bg-opacity-20 hover:bg-opacity-40 transition rounded-full text-white font-semibold text-base sm:text-lg shadow-lg backdrop-blur-md"
        aria-label="Go back to homepage"
      >
        Go Home
      </button>

      {/* Floating sparkles */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none">
        {sparkles.map((s, i) => (
          <span
            key={i}
            className="absolute bg-white rounded-full opacity-50 animate-float"
            style={{
              width: `${s.width}px`,
              height: `${s.height}px`,
              top: `${s.top}%`,
              left: `${s.left}%`,
              animationDelay: `${s.animationDelay}s`,
              animationDuration: `${s.animationDuration}s`,
            }}
          />
        ))}
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(20px);
            opacity: 0;
          }
        }
        .animate-float {
          animation-name: float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
      `}</style>
    </div>
  );
}
