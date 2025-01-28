function Background() {
  const starsCount = 40;
  const stars = Array.from({ length: starsCount }, () => ({
    size: (Math.random() * 2 + 1).toFixed(2),
    x: (Math.random() * 100).toFixed(2),
    y: (Math.random() * 100).toFixed(2),
    blur: (Math.random() * 1.5).toFixed(2),
    duration: `${Math.floor(Math.random() * 6 + 2)}s`,
  }));
  return (
    <div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_2px)] bg-[size:74px_94px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="absolute bottom-0 left-[-10%] right-0 top-[50%] -z-10 size-[1700px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(90,90,255,.25),rgba(255,255,255,0))] md:left-[-90%] lg:left-[-20%]"></div>
      <div className="absolute bottom-0 right-[-110%] top-[-10%] -z-10 size-[1300px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(80,80,255,.18),rgba(255,255,255,0))] md:right-[-90%] lg:right-[-20%]"></div>
      {/* Stars container */}
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
    </div>
  );
}

export default Background;
