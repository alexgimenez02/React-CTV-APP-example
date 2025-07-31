export default class Api {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor(baseUrl: string = '', headers: HeadersInit = { 'Content-Type': 'application/json' }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      headers: this.headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || response.statusText);
    }

    return response.json();
  }

  public get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request<T>(`${url}${query}`, {
      method: 'GET',
    });
  }

  public post<T>(url: string, body?: any): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  public put<T>(url: string, body?: any): Promise<T> {
    return this.request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  public patch<T>(url: string, body?: any): Promise<T> {
    return this.request<T>(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  public delete<T>(url: string): Promise<T> {
    return this.request<T>(url, {
      method: 'DELETE',
    });
  }
}
