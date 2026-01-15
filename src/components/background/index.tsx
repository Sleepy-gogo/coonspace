"use client";

import Stars from "./stars";

export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base: Deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#0c1222] to-[#050816]" />

      {/* Radial glow - top center (hero area) */}
      <div
        className="absolute left-1/2 top-0 h-[800px] w-[1200px] -translate-x-1/2 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(96, 165, 250, 0.3) 0%, transparent 60%)",
        }}
      />

      {/* Radial glow - left accent */}
      <div
        className="absolute -left-[300px] top-[20%] h-[600px] w-[600px] opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 60%)",
        }}
      />

      {/* Radial glow - right accent */}
      <div
        className="absolute -right-[200px] top-[40%] h-[500px] w-[500px] opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, transparent 60%)",
        }}
      />

      {/* Bottom gradient for footer blend */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[400px]"
        style={{
          background: "linear-gradient(to top, #020408 0%, transparent 100%)",
        }}
      />

      {/* Stars throughout */}
      <Stars count={120} />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
