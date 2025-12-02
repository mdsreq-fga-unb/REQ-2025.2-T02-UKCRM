const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

interface ApiClientOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export async function apiClient<T>(
  endpoint: string,
  options: ApiClientOptions = {},
): Promise<T> {
  const { method = "GET", body, headers, ...customConfig } = options;

  // Get auth token from localStorage
  const token = localStorage.getItem("authToken");

  const config: RequestInit = {
    method,
    headers: {
      ...(!(body instanceof FormData) && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    ...customConfig,
  };

  if (body) {
    config.body = body instanceof FormData ? body : JSON.stringify(body);
  }
  const fullUrl = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(fullUrl, config);
  if (!response.ok) {
    let errorInfo = "Erro desconhecido";
    try {
      const data = await response.json();
      errorInfo = JSON.stringify(data);
    } catch {
      /* empty */
    }
    throw new Error(`API Error ${response.status}: ${errorInfo}`);
  }
  if (response.status === 204) return null as T;
  return response.json();
}
