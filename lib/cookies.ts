/**
 * Cookie utility functions for authentication
 */

/**
 * Set a cookie
 */
export function setCookie(name: string, value: string, days: number = 7): void {
    if (typeof window === 'undefined') return;

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

/**
 * Get a cookie value
 */
export function getCookie(name: string): string | null {
    if (typeof window === 'undefined') return null;

    const nameEQ = name + "=";
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
}

/**
 * Delete a cookie
 */
export function deleteCookie(name: string): void {
    if (typeof window === 'undefined') return;

    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

/**
 * Set authentication token in both localStorage and cookie
 */
export function setAuthToken(token: string): void {
    if (typeof window === 'undefined') return;

    localStorage.setItem('auth_token', token);
    setCookie('auth_token', token, 7); // 7 days expiry
}

/**
 * Clear authentication token from both localStorage and cookie
 */
export function clearAuthToken(): void {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('auth_token');
    deleteCookie('auth_token');
}
