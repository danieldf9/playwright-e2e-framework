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

  async getArticles(params?: Record<string, string | number>) {
    const queryString = params
      ? '?' + Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')
      : '';
    const response = await this.request.get(`${this.baseURL}/articles${queryString}`);
    return response.json();
  }

  async getArticle(slug: string) {
    const response = await this.request.get(`${this.baseURL}/articles/${slug}`);
    return response.json();
  }

  async createArticle(token: string, title: string, description: string, body: string, tagList?: string[]) {
    const response = await this.request.post(`${this.baseURL}/articles`, {
      headers: { Authorization: `Token ${token}` },
      data: { article: { title, description, body, tagList: tagList || [] } },
    });
    return response.json();
  }

  async deleteArticle(token: string, slug: string) {
    return this.request.delete(`${this.baseURL}/articles/${slug}`, {
      headers: { Authorization: `Token ${token}` },
    });
  }

  async addComment(token: string, slug: string, body: string) {
    const response = await this.request.post(`${this.baseURL}/articles/${slug}/comments`, {
      headers: { Authorization: `Token ${token}` },
      data: { comment: { body } },
    });
    return response.json();
  }

  async favoriteArticle(token: string, slug: string) {
    const response = await this.request.post(`${this.baseURL}/articles/${slug}/favorite`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.json();
  }

  async unfavoriteArticle(token: string, slug: string) {
    const response = await this.request.delete(`${this.baseURL}/articles/${slug}/favorite`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.json();
  }

  async getTags() {
    const response = await this.request.get(`${this.baseURL}/tags`);
    return response.json();
  }

  async getProfile(username: string) {
    const response = await this.request.get(`${this.baseURL}/profiles/${username}`);
    return response.json();
  }
}
