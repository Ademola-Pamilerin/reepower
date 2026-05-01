import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { marketplaceApi, BuyerRequestsResponse } from '@/lib/api/marketplace-api';
import { ApiError } from '@/lib/api-client';

/**
 * Hook for fetching buyer requests from the marketplace
 */
export function useBuyerRequests(page: number = 1, limit: number = 10): UseQueryResult<BuyerRequestsResponse, ApiError> {
    return useQuery({
        queryKey: ['buyerRequests', page, limit],
        queryFn: () => marketplaceApi.getBuyerRequests(page, limit),
        placeholderData: (previousData) => previousData,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}
