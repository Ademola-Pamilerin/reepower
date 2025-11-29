import BuyRequestDetails from "../../../components/buyer/buy-requests/BuyRequestDetails";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function BuyRequestDetailsPage({ params }: PageProps) {
    const { id } = await params;

    return <BuyRequestDetails id={id} />;
}
