import Header from "~/components/header";
import CenterLight from "~/components/background/center-light";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden pb-4">
      <Header />
      <main>{children}</main>
      <CenterLight />
    </div>
  );
}
