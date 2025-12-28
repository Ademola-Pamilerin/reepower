import { useMutation, useQuery, UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import {
    authApi,
    RegisterPayload,
    RegisterResponse,
    VerifyEmailPayload,
    VerifyEmailResponse,
    ResendVerificationPayload,
    ResendVerificationResponse,
    LoginPayload,
    LoginResponse,
    ForgotPasswordPayload,
    ForgotPasswordResponse,
    VerifyResetTokenPayload,
    VerifyResetTokenResponse,
    ResetPasswordPayload,
    ResetPasswordResponse,
    GetCurrentUserResponse
} from '@/lib/api/auth-api';
import { ApiError } from '@/lib/api-client';

/**
 * Hook for user registration
 */
export function useRegister(): UseMutationResult<RegisterResponse, ApiError, RegisterPayload> {
    return useMutation({
        mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    });
}

/**
 * Hook for email verification
 */
export function useVerifyEmail(): UseMutationResult<VerifyEmailResponse, ApiError, VerifyEmailPayload> {
    return useMutation({
        mutationFn: (payload: VerifyEmailPayload) => authApi.verifyEmail(payload),
    });
}

/**
 * Hook for resending verification email
 */
export function useResendVerification(): UseMutationResult<ResendVerificationResponse, ApiError, ResendVerificationPayload> {
    return useMutation({
        mutationFn: (payload: ResendVerificationPayload) => authApi.resendVerification(payload),
    });
}

/**
 * Hook for user login
 */
export function useLogin(): UseMutationResult<LoginResponse, ApiError, LoginPayload> {
    return useMutation({
        mutationFn: (payload: LoginPayload) => authApi.login(payload),
    });
}

/**
 * Hook for forgot password
 */
export function useForgotPassword(): UseMutationResult<ForgotPasswordResponse, ApiError, ForgotPasswordPayload> {
    return useMutation({
        mutationFn: (payload: ForgotPasswordPayload) => authApi.forgotPassword(payload),
    });
}

/**
 * Hook for verifying password reset token
 */
export function useVerifyResetToken(): UseMutationResult<VerifyResetTokenResponse, ApiError, VerifyResetTokenPayload> {
    return useMutation({
        mutationFn: (payload: VerifyResetTokenPayload) => authApi.verifyResetToken(payload),
    });
}

/**
 * Hook for resetting password
 */
export function useResetPassword(): UseMutationResult<ResetPasswordResponse, ApiError, ResetPasswordPayload> {
    return useMutation({
        mutationFn: (payload: ResetPasswordPayload) => authApi.resetPassword(payload),
    });
}

/**
 * Hook for getting current authenticated user
 */
export function useCurrentUser(enabled: boolean = true): UseQueryResult<GetCurrentUserResponse, ApiError> {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: () => authApi.getCurrentUser(),
        enabled, // Only fetch if enabled (e.g., when user is authenticated)
        retry: false, // Don't retry on 401 errors
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    });
}
