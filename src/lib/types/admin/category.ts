export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
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

export interface CreateCategoryData {
  name: string;
  description?: string;
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
}
