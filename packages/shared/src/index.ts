// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationQuery {
  page?: number;
  pageSize?: number;
}

// ─── API Response wrapper ─────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ─── User / Auth ──────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  email: string;
  displayName: string;
  password: string;
}

// ─── Article ──────────────────────────────────────────────────────────────────

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  authorId: string;
  tags: string[];
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateArticleDto {
  title: string;
  summary: string;
  content: string;
  tags?: string[];
}
