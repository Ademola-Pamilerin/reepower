import TrackOrderDetails from "../../../../components/buyer/shared/TrackOrderDetails";

export default async function TrackOrderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <TrackOrderDetails id={id} />;
}
