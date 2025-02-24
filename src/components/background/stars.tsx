interface StarsProps {
  opacity?: number;
  count?: number;
  options?: {
    size: number;
    x: number;
    y: number;
    blur: number;
    duration: number;
  };
}

function Stars({
  opacity = 1,
  count = 40,
  options = { size: 2, x: 100, y: 100, blur: 1.5, duration: 6 },
}: StarsProps) {
  const { size, x, y, blur, duration } = options;

  const starsCount = count;
  const stars = Array.from({ length: starsCount }, () => ({
    size: (Math.random() * size + 1).toFixed(2),
    x: (Math.random() * x).toFixed(2),
    y: (Math.random() * y).toFixed(2),
    blur: (Math.random() * blur).toFixed(2),
    duration: `${Math.floor(Math.random() * duration + 2)}s`,
  }));

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ opacity }}
    >
      {stars.map((star, index) => (
        <div
          key={index}
          className="star"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            filter: `blur(${star.blur}px)`,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
}

export default Stars;
