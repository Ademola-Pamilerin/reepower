import Footer from "../../layout/Footer";
import SellerHeader from "./SellerHeader";
import SellerNavigation from "./SellerNavigation";

interface SellerLayoutProps {
    children: React.ReactNode;
}

export default function SellerLayout({ children }: SellerLayoutProps) {
    return (
        <div className="min-h-screen w-full bg-white">
            <SellerHeader />
            <SellerNavigation />
            <main className="w-full">
                {children}
                <Footer />
            </main>
        </div>
    );
}
