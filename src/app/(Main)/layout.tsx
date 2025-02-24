import Stars from "~/components/background/stars";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <main className="min-h-[85vh]">{children}</main>
      <Stars fixed />
    </>
  );
}
