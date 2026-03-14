import Footer from "./footer";
import { Header } from "./header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="grow pt-20">{children}</main>
      <Footer />
    </div>
  );
}
