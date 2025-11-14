// Central API helpers
// DUAL BACKEND SETUP:
// - backendUrl: External Node.js backend (port 5000) - for auth, database, user management
// - nextApiUrl: Next.js internal API (port 4000) - for OpenAI, TTS, internal processing

const nodeAPIUrl = process.env.NEXT_PUBLIC_NODE_BASE_URL || 'http://localhost:1000';
const nextApiUrl = process.env.NEXT_PUBLIC_NEXT_BASE_URL || 'http://localhost:5000';

// JWT token management
const TOKEN_KEY = 'opura_jwt_token';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  // Also set as cookie for middleware access
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function clearToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  // Also clear the cookie
  document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

/**
 * Construct a full URL for the external Node.js backend API
 * Use this for authentication, database, and user management endpoints
 *
 * @param path - API path (e.g., '/api/users/login')
 * @returns Full URL to external backend
 */
export function apiUrl(path: string): string {
  return `${nodeAPIUrl}${path}`;
}

/**
 * Construct a full URL for the Next.js internal API
 * Use this for OpenAI, TTS, and internal processing endpoints
 *
 * @param path - API path (e.g., '/api/chat', '/api/tts')
 * @returns Full URL to Next.js internal API
 */
export function nextjsApiUrl(path: string): string {
  if (!path) return nextApiUrl;
  // ensure single slash between base and path
  if (path.startsWith('/')) return `${nextApiUrl}${path}`;
  return `${nextApiUrl}/${path}`;
}

export async function apiFetch(path: string, init?: RequestInit) {
  const token = getToken();
  const headers = new Headers(init?.headers);
  
  // Add JWT token to Authorization header if available
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  // Ensure Content-Type is set for JSON requests
  if (!headers.has('Content-Type') && init?.body) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(apiUrl(path), {
    ...init,
    headers,
  });
}

export async function nextjsApiFetch(path: string, init?: RequestInit) {
  const token = getToken();
  const headers = new Headers(init?.headers);
  
  // Add JWT token to Authorization header if available
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  // Ensure Content-Type is set for JSON requests
  if (!headers.has('Content-Type') && init?.body) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(nextjsApiUrl(path), {
    ...init,
    headers,
  });
}
