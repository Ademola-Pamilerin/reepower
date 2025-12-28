import SellerLayout from "../components/sellers/layout/SellerLayout";

export default function SellersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <SellerLayout>{children}</SellerLayout>;
}
