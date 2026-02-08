const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  email_verified: boolean;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  async register(email: string, password: string, name?: string): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, email_verified: false }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Registration failed');
    }

    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    return data;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);

    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    return data;
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${this.baseUrl}/users/tasks`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    return response.json();
  }

  async createTask(title: string, description?: string): Promise<Task> {
    const response = await fetch(`${this.baseUrl}/users/tasks`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ title, description, completed: false }),
    });

    if (!response.ok) {
      throw new Error('Failed to create task');
    }

    return response.json();
  }

  async updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
    const response = await fetch(`${this.baseUrl}/users/tasks/${taskId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Failed to update task');
    }

    return response.json();
  }

  async deleteTask(taskId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/users/tasks/${taskId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  }

  async toggleTask(taskId: string): Promise<Task> {
    const response = await fetch(`${this.baseUrl}/users/tasks/${taskId}/toggle`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to toggle task');
    }

    return response.json();
  }
}

export const apiClient = new ApiClient();
