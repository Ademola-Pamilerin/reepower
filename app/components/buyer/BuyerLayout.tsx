import Footer from "../layout/Footer";
import BuyerHeader from "./BuyerHeader";
import BuyerNavigation from "./BuyerNavigation";

interface BuyerLayoutProps {
  children: React.ReactNode;
}

export default function BuyerLayout({ children }: BuyerLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-white">
      <BuyerHeader />
      <BuyerNavigation />
      <main className="w-full">
        {children}
        <Footer />
      </main>
    </div>
  );
}
