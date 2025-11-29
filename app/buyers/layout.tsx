import BuyerLayout from "../components/buyer/layout/BuyerLayout";

export default function BuyersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <BuyerLayout>{children}</BuyerLayout>;
}
