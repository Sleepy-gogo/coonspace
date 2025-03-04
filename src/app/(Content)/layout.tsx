import BottomGradient from "~/components/background/bottom-gradient";
import { Footer } from "~/components/footer";
import Header from "~/components/header";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <BottomGradient />
      <Footer />
    </>
  );
}
