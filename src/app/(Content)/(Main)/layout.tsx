import Stars from "~/components/background/stars";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* Background layers */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-slate-900 via-[#0c1222] to-[#050816]" />
      <div
        className="fixed left-1/2 top-0 -z-10 h-[600px] w-[1000px] -translate-x-1/2 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(96, 165, 250, 0.3) 0%, transparent 60%)",
        }}
      />
      <Stars count={80} fixed />

      <main className="relative flex min-h-[85dvh] flex-col pt-24 pb-24">
        <div className="flex-1">{children}</div>
      </main>
    </>
  );
}
