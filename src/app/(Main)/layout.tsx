import BottomGradient from '~/components/background/bottom-gradient';
import Stars from '~/components/background/stars';
import { Footer } from '~/components/footer';
import Header from "~/components/header";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden">
      <Header />
      <main className="min-h-[85vh]">{children}</main>
      <Stars opacity={0.7} />
      <BottomGradient />
      <Footer />
    </div>
  );
}
