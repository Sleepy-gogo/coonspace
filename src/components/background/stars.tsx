function Stars() {
  const starsCount = 40;
  const stars = Array.from({ length: starsCount }, () => ({
    size: (Math.random() * 2 + 1).toFixed(2),
    x: (Math.random() * 100).toFixed(2),
    y: (Math.random() * 100).toFixed(2),
    blur: (Math.random() * 1.5).toFixed(2),
    duration: `${Math.floor(Math.random() * 6 + 2)}s`,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
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
  )
}

export default Stars