"use client";

interface StarsProps {
  count?: number;
  fixed?: boolean;
}

export default function Stars({ count = 100, fixed = false }: StarsProps) {
  const stars = Array.from({ length: count }, (_, i) => {
    const size = Math.random() * 2.5 + 0.5; // 0.5-3px
    const isBlue = Math.random() > 0.7;
    const isDim = Math.random() > 0.6;

    return {
      id: i,
      size,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 3, // 3-6s
      isBlue,
      isDim,
    };
  });

  return (
    <div
      className={`pointer-events-none ${fixed ? "fixed" : "absolute"} inset-0 overflow-hidden`}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star ${star.isBlue ? "star--blue" : ""} ${star.isDim ? "star--dim" : ""}`}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
