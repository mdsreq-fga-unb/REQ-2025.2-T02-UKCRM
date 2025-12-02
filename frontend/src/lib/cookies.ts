/**
 * Cookie utility functions for client-side cookie management
 */

export interface CookieOptions {
  expires?: number | Date; // Days until expiration or specific date
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Set a cookie
 * @param name Cookie name
 * @param value Cookie value
 * @param options Cookie options
 */
export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  const {
    expires = 365, // Default: 1 year
    path = '/',
    domain,
    secure = window.location.protocol === 'https:',
    sameSite = 'lax',
  } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  // Handle expiration
  if (expires) {
    const expiresDate =
      typeof expires === 'number'
        ? new Date(Date.now() + expires * 24 * 60 * 60 * 1000)
        : expires;
    cookieString += `; expires=${expiresDate.toUTCString()}`;
  }

  cookieString += `; path=${path}`;

  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  if (secure) {
    cookieString += '; secure';
  }

  cookieString += `; SameSite=${sameSite}`;

  document.cookie = cookieString;
}

/**
 * Get a cookie value by name
 * @param name Cookie name
 * @returns Cookie value or null if not found
 */
export function getCookie(name: string): string | null {
  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(nameEQ)) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null;
}

/**
 * Remove a cookie
 * @param name Cookie name
 * @param options Cookie options (path and domain should match the original cookie)
 */
export function removeCookie(
  name: string,
  options: Pick<CookieOptions, 'path' | 'domain'> = {}
): void {
  setCookie(name, '', {
    ...options,
    expires: new Date(0), // Set to past date
  });
}

/**
 * Check if a cookie exists
 * @param name Cookie name
 * @returns True if cookie exists
 */
export function hasCookie(name: string): boolean {
  return getCookie(name) !== null;
}
