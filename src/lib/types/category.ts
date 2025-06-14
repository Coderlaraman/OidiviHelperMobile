export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  sort_order?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface CategoryFilters {
  search?: string;
  with_skills?: boolean;
  with_service_requests?: boolean;
  sort_by?: "name" | "created_at" | "updated_at" | "sort_order";
  sort_direction?: "asc" | "desc";
  per_page?: number;
  page?: number;
}
