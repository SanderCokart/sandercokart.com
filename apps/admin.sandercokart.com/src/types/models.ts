export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  content?: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  published_at?: string | null;
}
