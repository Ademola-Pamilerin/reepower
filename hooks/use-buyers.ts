import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { buyersApi, BuyerDashboardResponse, CreateBuyRequestPayload, CreateBuyRequestResponse, BuyRequestsResponse, BuyRequestsParams } from '@/lib/api/buyers-api';
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

/**
 * Hook for editing a buy request
 */
export function useEditBuyRequest(): UseMutationResult<CreateBuyRequestResponse, ApiError, { id: string; payload: CreateBuyRequestPayload }> {
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: CreateBuyRequestPayload }) => buyersApi.editRequest(id, payload),
    });
}

/**
 * Hook for fetching paginated buy requests
 */
export function useBuyRequests(params?: BuyRequestsParams): UseQueryResult<BuyRequestsResponse, ApiError> {
    return useQuery({
        queryKey: ['buyRequests', params],
        queryFn: () => buyersApi.getBuyRequests(params),
        staleTime: 1 * 60 * 1000, // Consider data fresh for 1 minute
        refetchOnWindowFocus: true, // Refetch when user returns to the tab
    });
}

/**
 * Hook for fetching a single buy request
 */
export function useBuyRequest(id: string | null): UseQueryResult<CreateBuyRequestResponse, ApiError> {
    return useQuery({
        queryKey: ['buyRequest', id],
        queryFn: () => buyersApi.getRequest(id!),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
}

/**
 * Hook for deleting a buy request
 */
export function useDeleteBuyRequest(): UseMutationResult<any, ApiError, string> {
    return useMutation({
        mutationFn: (id: string) => buyersApi.deleteRequest(id),
    });
}
