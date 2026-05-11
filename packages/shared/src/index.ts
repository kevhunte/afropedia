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

// ─── Timeline ─────────────────────────────────────────────────────────────────

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface TimelineEventContent {
  beginner: string;
  intermediate: string;
  advanced: string;
}

export interface TimelineEventReference {
  title: string;
  url?: string;
  type: 'book' | 'article' | 'documentary' | 'website' | 'journal';
  author?: string;
}

export interface TimelineEvent {
  id: string;
  year: number;
  endYear?: number;
  title: string;
  region: string;
  category: string;
  summary: string;
  content: TimelineEventContent;
  references: TimelineEventReference[];
  imageUrl?: string;
}

export interface TimelineQuery extends PaginationQuery {
  startYear?: number;
  endYear?: number;
  category?: string;
  region?: string;
}
