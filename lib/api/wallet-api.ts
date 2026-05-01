import { apiClient } from '../api-client';

export interface CreateWalletPayload {
    bvn: string;
    phone_number: string;
    email: string;
    account_name: string;
}

export interface CreateWalletResponse {
    success: boolean;
    message: string;
    data?: {
        wallet_id?: string;
        account_number?: string;
        account_name?: string;
        bank_name?: string;
        balance?: string | number;
        [key: string]: any;
    };
}

export interface WalletDetailsResponse {
    success: boolean;
    data: {
        balance: string | number;
        account_number: string;
        account_name: string;
        bank_name: string;
        [key: string]: any;
    };
}

/**
 * Wallet API service
 */
export const walletApi = {
    /**
     * Request OTP for wallet creation
     */
    async requestOtp(phoneNumber: string): Promise<any> {
        return apiClient.post('/api/wallet/create-wallet', { phone_number: phoneNumber });
    },

    /**
     * Create a new wallet
     */
    async createWallet(payload: CreateWalletPayload): Promise<CreateWalletResponse> {
        return apiClient.post<CreateWalletResponse>('/api/wallet/create-wallet', payload);
    },

    /**
     * Get wallet bank details
     */
    async getWalletBanks(): Promise<WalletDetailsResponse> {
        return apiClient.get<WalletDetailsResponse>('/api/wallet/banks');
    },
};
