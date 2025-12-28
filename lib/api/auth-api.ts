import { apiClient } from '../api-client';

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    username: string;
    user_type: 'individual' | 'seller' | 'buyer';
    business_name: string;
    phone: string;
    state: string;
    lga: string;
    address: string;
}

export interface RegisterResponse {
    message: string;
    user?: any;
    token?: string;
}

export interface VerifyEmailPayload {
    email: string;
    token: string;
}

export interface VerifyEmailResponse {
    message: string;
    success: boolean;
}

export interface ResendVerificationPayload {
    email: string;
}

export interface ResendVerificationResponse {
    message: string;
    success: boolean;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    success: boolean;
    token?: string;
    user?: any;
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface ForgotPasswordResponse {
    message: string;
    success: boolean;
}

export interface VerifyResetTokenPayload {
    email: string;
    token: string;
}

export interface VerifyResetTokenResponse {
    message: string;
    success: boolean;
}

export interface ResetPasswordPayload {
    email: string;
    token: string;
    newPassword: string;
}

export interface ResetPasswordResponse {
    message: string;
    success: boolean;
}

export interface GetCurrentUserResponse {
    success: boolean;
    user: {
        id: string;
        name: string;
        email: string;
        username: string;
        user_type: 'individual' | 'seller' | 'buyer';
        business_name?: string;
        phone: string;
        state: string;
        lga: string;
        address: string;
        created_at?: string;
        updated_at?: string;
    };
}

/**
 * Authentication API service
 */
export const authApi = {
    /**
     * Register a new user
     */
    async register(payload: RegisterPayload): Promise<RegisterResponse> {
        return apiClient.post<RegisterResponse>('/api/auth/register', payload);
    },

    /**
     * Verify user email with token
     */
    async verifyEmail(payload: VerifyEmailPayload): Promise<VerifyEmailResponse> {
        return apiClient.post<VerifyEmailResponse>('/api/auth/verify-email', payload);
    },

    /**
     * Resend verification email
     */
    async resendVerification(payload: ResendVerificationPayload): Promise<ResendVerificationResponse> {
        return apiClient.post<ResendVerificationResponse>('/api/auth/resend-verification', payload);
    },

    /**
     * Login user
     */
    async login(payload: LoginPayload): Promise<LoginResponse> {
        return apiClient.post<LoginResponse>('/api/auth/login', payload);
    },

    /**
     * Request password reset
     */
    async forgotPassword(payload: ForgotPasswordPayload): Promise<ForgotPasswordResponse> {
        return apiClient.post<ForgotPasswordResponse>('/api/auth/forgot-password', payload);
    },

    /**
     * Verify password reset token
     */
    async verifyResetToken(payload: VerifyResetTokenPayload): Promise<VerifyResetTokenResponse> {
        return apiClient.post<VerifyResetTokenResponse>('/api/auth/verify-reset-token', payload);
    },

    /**
     * Reset password with token
     */
    async resetPassword(payload: ResetPasswordPayload): Promise<ResetPasswordResponse> {
        return apiClient.post<ResetPasswordResponse>('/api/auth/reset-password', payload);
    },

    /**
     * Get current authenticated user
     */
    async getCurrentUser(): Promise<GetCurrentUserResponse> {
        return apiClient.get<GetCurrentUserResponse>('/api/auth/me');
    },
};
