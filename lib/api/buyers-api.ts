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
}

export interface CreateBuyRequestResponse {
    success: boolean;
    message: string;
    data?: {
        request_id?: string;
        [key: string]: any;
    };
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
};
