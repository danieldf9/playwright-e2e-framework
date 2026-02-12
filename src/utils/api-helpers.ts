import { APIRequestContext } from '@playwright/test';

export class ApiHelpers {
  private request: APIRequestContext;
  private baseURL: string;

  constructor(request: APIRequestContext, baseURL?: string) {
    this.request = request;
    this.baseURL = baseURL || process.env.API_URL || 'https://api.realworld.show/api';
  }

  async createUser(username: string, email: string, password: string) {
    const response = await this.request.post(`${this.baseURL}/users`, {
      data: { user: { username, email, password } },
    });
    return response.json();
  }

  async loginUser(email: string, password: string) {
    const response = await this.request.post(`${this.baseURL}/users/login`, {
      data: { user: { email, password } },
    });
    return response.json();
  }

  async getUser(token: string) {
    const response = await this.request.get(`${this.baseURL}/user`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.json();
  }

  async updateUser(token: string, userData: Record<string, string>) {
    const response = await this.request.put(`${this.baseURL}/user`, {
      headers: { Authorization: `Token ${token}` },
      data: { user: userData },
    });
    return response.json();
  }

  async getArticles(params?: { tag?: string; author?: string; favorited?: string; limit?: number; offset?: number }) {
    const queryParams = new URLSearchParams();
    if (params?.tag) queryParams.append('tag', params.tag);
    if (params?.author) queryParams.append('author', params.author);
    if (params?.favorited) queryParams.append('favorited', params.favorited);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());

    const response = await this.request.get(`${this.baseURL}/articles?${queryParams.toString()}`);
    return response.json();
  }

  async getArticle(slug: string, token?: string) {
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Token ${token}`;
    const response = await this.request.get(`${this.baseURL}/articles/${slug}`, { headers });
    return response.json();
  }

  async createArticle(token: string, title: string, description: string, body: string, tagList: string[] = []) {
    const response = await this.request.post(`${this.baseURL}/articles`, {
      headers: { Authorization: `Token ${token}` },
      data: {
        article: { title, description, body, tagList },
      },
    });
    return response.json();
  }

  async deleteArticle(token: string, slug: string) {
    return await this.request.delete(`${this.baseURL}/articles/${slug}`, {
      headers: { Authorization: `Token ${token}` },
    });
  }

  async addComment(token: string, slug: string, body: string) {
    const response = await this.request.post(`${this.baseURL}/articles/${slug}/comments`, {
      headers: { Authorization: `Token ${token}` },
      data: {
        comment: { body },
      },
    });
    return response.json();
  }

  async favoriteArticle(token: string, slug: string) {
    const response = await this.request.post(`${this.baseURL}/articles/${slug}/favorite`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.json();
  }

  async getTags() {
    const response = await this.request.get(`${this.baseURL}/tags`);
    return response.json();
  }

  async getProfile(username: string, token?: string) {
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Token ${token}`;
    const response = await this.request.get(`${this.baseURL}/profiles/${username}`, { headers });
    return response.json();
  }

  async followUser(token: string, username: string) {
    const response = await this.request.post(`${this.baseURL}/profiles/${username}/follow`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.json();
  }

  async updateUser(token: string, data: { email?: string; username?: string; bio?: string; image?: string }) {
    const response = await this.request.put(`${this.baseURL}/user`, {
      headers: { Authorization: `Token ${token}` },
      data: { user: data },
    });
    return response.json();
  }
}
