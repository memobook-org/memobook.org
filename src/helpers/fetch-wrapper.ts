import { useAuthStore } from "../stores/auth.store";

export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
};

function request(method: string) {
  return async (
    url: RequestInfo | URL,
    body?: Record<string, unknown> | undefined,
  ) => {
    const requestHeaders: HeadersInit = new Headers();

    const requestOptions: RequestInit | undefined = {
      method,
      headers: authHeader(url.toString(), requestHeaders),
    };
    if (body) {
      requestHeaders.set("Content-Type", "application/json");
      requestOptions.body = JSON.stringify(body);
    }
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
  };
}

// helper functions

function authHeader(url: string, headers: Headers): HeadersInit | undefined {
  // return auth header with jwt if user is logged in and request is to the api url
  const { user } = useAuthStore();
  const isLoggedIn = !!user?.token;
  const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
  if (isLoggedIn && isApiUrl) {
    headers.set("Authorization", `Bearer ${user.token}`);
    return headers;
  } else {
    headers.delete("Authorization");
    return headers;
  }
}

async function handleResponse(response: {
  text: () => Promise<string>;
  ok: boolean;
  status: number;
  statusText: string;
}) {
  const { user, logout } = useAuthStore();
  if (!response.ok && [401, 403].includes(response.status) && user) {
    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    return logout();
  }

  const text = await response.text();
  const data = text && JSON.parse(text);
  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  return data;
}
