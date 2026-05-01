import { apiClient } from '../api-client';

export interface BuyerDashboardStats {
    active_requests: number;
    new_offer_received: number;
    completed_orders: number;
}

export interface RecentOrder {
    id?: string;
    seller_name?: string;
    material?: string;
    final_price?: string;
    date_created?: string;
    trans_type?: string;
    qty?: string;
    status?: string;
}

export interface RecentRequest {
    id?: string;
    commodity_type?: string;
    qty?: string;
    budget?: string;
    date_created?: string;
    offers?: number;
}

export interface RecentActivityItem {
    id?: number;
    type?: string;
    message?: string;
    time?: string;
    icon?: string;
}

export interface BuyerDashboardData {
    stats: BuyerDashboardStats;
    recent_orders: RecentOrder[];
    recent_requests: RecentRequest[];
    recent_activity: RecentActivityItem[];
}

export interface BuyerDashboardResponse {
    success: boolean;
    data: BuyerDashboardData;
}

export interface CreateBuyRequestPayload {
    material_type: string;
    quantity_needed: number;
    preferred_quantity: number;
    min_price_per_kg: number;
    max_price_per_kg: number;
    preferred_location: string;
    description: string;
    image: string;
    images?: string[];
}

export interface CreateBuyRequestResponse {
    success: boolean;
    message: string;
    data?: {
        request_id?: string;
        [key: string]: any;
    };
}

export interface BuyRequestItem {
    id: number;
    request_id: string; // "BR-20260115-288"
    material_type: string;
    qty_needed: number;
    preferred_quantity: number;
    min_price_per_kg: string;
    max_price_per_kg: string; // "999.00"
    preferred_location: string;
    description: string;
    image: string; // "https://..."
    user_id: number;
    created_by: number;
    created_at: string;
    updatedAt: string;
    offers?: number; // Kept as optional if not always present or computed frontend side, though sample implies it might not be in the root object or needs check. The sample didn't show 'offers', but the interface had it. I'll keep it optional.
    // Derived/Frontend fields that might be needed or mapped later
    status?: "Active" | "Fulfilled" | "Expired";
}

export interface BuyRequestsResponse {
    success: boolean;
    count: number;
    total: number;
    pages: number;
    data: BuyRequestItem[];
}

export interface BuyRequestsParams {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
}

/**
 * Buyers API service
 */
export const buyersApi = {
    /**
     * Get buyer dashboard data
     */
    async getDashboard(): Promise<BuyerDashboardResponse> {
        return apiClient.get<BuyerDashboardResponse>('/api/buyers/dashboard');
    },

    /**
     * Create a new buy request
     */
    async createRequest(payload: CreateBuyRequestPayload): Promise<CreateBuyRequestResponse> {
        return apiClient.post<CreateBuyRequestResponse>('/api/buyers/create-request', payload);
    },

    /**
     * Edit an existing buy request
     */
    async editRequest(id: string, payload: CreateBuyRequestPayload): Promise<CreateBuyRequestResponse> {
        return apiClient.put<CreateBuyRequestResponse>(`/api/buyers/edit-request/${id}`, payload);
    },

    /**
     * Get paginated buy requests
     */
    async getBuyRequests(params?: BuyRequestsParams): Promise<BuyRequestsResponse> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.status) queryParams.append('status', params.status);
        if (params?.search) queryParams.append('search', params.search);

        const queryString = queryParams.toString();
        const url = `/api/buyers/requests${queryString ? `?${queryString}` : ''}`;

        return apiClient.get<BuyRequestsResponse>(url);
    },

    /**
     * Get a single buy request
     */
    async getRequest(id: string): Promise<CreateBuyRequestResponse> {
        return apiClient.get<CreateBuyRequestResponse>(`/api/buyers/requests/${id}`);
    },

    /**
     * Delete a buy request
     */
    async deleteRequest(id: string): Promise<any> {
        return apiClient.delete(`/api/buyers/delete-request/${id}`);
    },
};
