import BottomGradient from "~/components/background/bottom-gradient";
import { Footer } from "~/components/footer";
import Header from "~/components/header";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <BottomGradient />
      <Footer />
    </div>
  );
}
