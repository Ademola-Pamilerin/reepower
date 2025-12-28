import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { buyersApi, BuyerDashboardResponse, CreateBuyRequestPayload, CreateBuyRequestResponse } from '@/lib/api/buyers-api';
import { ApiError } from '@/lib/api-client';

/**
 * Hook for fetching buyer dashboard data
 */
export function useBuyerDashboard(): UseQueryResult<BuyerDashboardResponse, ApiError> {
    return useQuery({
        queryKey: ['buyerDashboard'],
        queryFn: () => buyersApi.getDashboard(),
        staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes
        refetchOnWindowFocus: true, // Refetch when user returns to the tab
    });
}

/**
 * Hook for creating a buy request
 */
export function useCreateBuyRequest(): UseMutationResult<CreateBuyRequestResponse, ApiError, CreateBuyRequestPayload> {
    return useMutation({
        mutationFn: (payload: CreateBuyRequestPayload) => buyersApi.createRequest(payload),
    });
}
