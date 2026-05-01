import { apiClient } from '../api-client';

export interface BuyerRequest {
    id: number;
    request_id: string;
    user_id: number;
    material_type: string;
    qty_needed: number;
    description?: string;
    location?: string;
    status?: string;
    min_price_per_kg?: string | number;
    max_price_per_kg?: string | number;
    created_at?: string;
    image?: string;
    buyer?: {
        id: number;
        name: string;
    };
    user?: {
        name: string;
        business_name?: string;
    };
    [key: string]: any;
}

export interface BuyerRequestsResponse {
    success: boolean;
    data: BuyerRequest[];
    count: number;
    pages: number;
    total: number;
    message?: string;
}

export const marketplaceApi = {
    /**
     * Get all buyer requests with pagination
     */
    async getBuyerRequests(page: number = 1, limit: number = 10): Promise<BuyerRequestsResponse> {
        return apiClient.get<BuyerRequestsResponse>(`/api/buyers/requests?page=${page}&limit=${limit}`);
    },
};
