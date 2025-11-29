export interface Order {
    id: string;
    requestId: string;
    sellerName: string;
    material: string;
    finalPrice: string;
    dateCreated: string;
    transType: "Request" | "Direct";
    qty: string;
    status: "Active" | "Completed" | "Pending";
}
