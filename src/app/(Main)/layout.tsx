import BottomGradient from '~/components/background/bottom-gradient';
import Header from "~/components/header";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden pb-4">
      <Header />
      <main className="min-h-[85vh]">{children}</main>
      <BottomGradient />
    </div>
  );
}
