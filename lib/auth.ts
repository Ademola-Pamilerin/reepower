/**
 * Authentication utility functions
 */

/**
 * Check if user is authenticated by verifying token exists
 */
export function isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;

    const token = localStorage.getItem('auth_token');
    return !!token;
}

/**
 * Get authentication token from localStorage
 */
export function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;

    return localStorage.getItem('auth_token');
}

/**
 * Get user data from localStorage
 */
export function getUserData(): any | null {
    if (typeof window === 'undefined') return null;

    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
}

/**
 * Get user type from localStorage
 */
export function getUserType(): 'buyer' | 'seller' | null {
    if (typeof window === 'undefined') return null;

    return localStorage.getItem('user_type') as 'buyer' | 'seller' | null;
}

/**
 * Clear all authentication data
 */
import { clearAuthToken } from './cookies';

/**
 * Clear all authentication data
 */
export function clearAuthData(): void {
    if (typeof window === 'undefined') return;

    // Clear localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_type');

    // Clear cookies
    clearAuthToken();
}

/**
 * Logout user and clear auth data
 */
export function logout(): void {
    // // Optional: Call API to invalidate session on server
    // try {
    //     fetch('/api/auth/logout', { method: 'POST' });
    // } catch (error) {
    //     console.error('Logout API call failed:', error);
    // }

    clearAuthData();
    window.location.href = '/auth';
}
