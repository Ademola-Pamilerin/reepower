import Footer from "../../layout/Footer";
import BuyerHeader from "./BuyerHeader";
import BuyerNavigation from "./BuyerNavigation";
import { BuyRequestsProvider } from "../../../context/BuyRequestsContext";
import { WalletProvider } from "../../../context/WalletContext";

interface BuyerLayoutProps {
  children: React.ReactNode;
}

export default function BuyerLayout({ children }: BuyerLayoutProps) {
  return (
    <BuyRequestsProvider>
      <WalletProvider>
        <div className="min-h-screen w-full bg-white">
          <BuyerHeader />
          <BuyerNavigation />
          <main className="w-full">
            {children}
            <Footer />
          </main>
        </div>
      </WalletProvider>
    </BuyRequestsProvider>
  );
}
