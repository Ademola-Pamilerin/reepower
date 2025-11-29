import { Suspense } from "react";
import CreateBuyRequestForm from "../../../components/buyer/buy-requests/CreateBuyRequestForm";
import SuspenseLoader from "../../../components/shared/SuspenseLoader";

export default function CreateBuyRequestPage() {
    return (
        <Suspense fallback={<SuspenseLoader />}>
            <CreateBuyRequestForm />
        </Suspense>
    );
}
