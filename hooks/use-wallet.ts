import { useMutation, useQuery, UseMutationResult, UseQueryResult, useQueryClient } from '@tanstack/react-query';
import {
    walletApi,
    CreateWalletPayload,
    CreateWalletResponse,
    WalletDetailsResponse
} from '@/lib/api/wallet-api';
import { ApiError } from '@/lib/api-client';

/**
 * Hook for requesting wallet OTP
 */
export function useRequestOtp(): UseMutationResult<any, ApiError, string> {
    return useMutation({
        mutationFn: (phoneNumber: string) => walletApi.requestOtp(phoneNumber),
    });
}

/**
 * Hook for wallet creation
 */
export function useCreateWallet(): UseMutationResult<CreateWalletResponse, ApiError, CreateWalletPayload> {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (payload: CreateWalletPayload) => walletApi.createWallet(payload),
        onSuccess: () => {
            // Invalidate wallet details query to refresh data after creation
            queryClient.invalidateQueries({ queryKey: ['walletDetails'] });
        }
    });
}

/**
 * Hook for getting wallet bank details
 */
export function useWalletBanks(enabled: boolean = true): UseQueryResult<WalletDetailsResponse, ApiError> {
    return useQuery({
        queryKey: ['walletBanks'],
        queryFn: () => walletApi.getWalletBanks(),
        enabled,
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}
