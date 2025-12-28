import { API_CONFIG } from './config';

export interface ValidationError {
    field: string;
    message: string;
    value?: any;
}

export class ApiError extends Error {
    constructor(
        public status: number,
        public message: string,
        public data?: any,
        public errors?: ValidationError[]
    ) {
        super(message);
        this.name = 'ApiError';
    }

    /**
     * Get formatted error message including validation errors
     */
    getFullMessage(): string {
        if (this.errors && this.errors.length > 0) {
            const validationMessages = this.errors.map(err => err.message).join(', ');
            return validationMessages;
        }
        return this.message;
    }
}

export interface ApiResponse<T = any> {
    data?: T;
    message?: string;
    error?: string;
    success?: boolean;
    errors?: ValidationError[];
}

/**
 * Base API client for making HTTP requests
 */
export const apiClient = {
    async request<T = any>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${API_CONFIG.BASE_URL}${endpoint}`;

        // Get auth token from localStorage if available
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

        const config: RequestInit = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new ApiError(
                    response.status,
                    data.message || data.error || 'An error occurred',
                    data,
                    data.errors // Include validation errors
                );
            }

            return data;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }

            // Network or other errors
            throw new ApiError(
                0,
                error instanceof Error ? error.message : 'Network error occurred'
            );
        }
    },

    async get<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    },

    async post<T = any>(
        endpoint: string,
        body?: any,
        options?: RequestInit
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
        });
    },

    async put<T = any>(
        endpoint: string,
        body?: any,
        options?: RequestInit
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body),
        });
    },

    async delete<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    },
};
