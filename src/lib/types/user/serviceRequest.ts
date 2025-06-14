// src/lib/types/user/serviceRequest.ts

import { User } from "./user";
import type { ServiceOffer as FullServiceOffer } from "./serviceOffer";

export type ServiceRequestStatus =
  | "pending"
  | "published"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "draft";

export type ServiceRequestVisibility = "public" | "private";
export type ServiceRequestPriority = "low" | "medium" | "high" | "urgent";
export type ServiceRequestPaymentMethod =
  | "paypal"
  | "credit_card"
  | "bank_transfer";
export type ServiceRequestType = "one_time" | "recurring";

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  skills_count: number;
  service_requests_count: number;
  admin_metadata: {
    can_be_deleted: boolean;
    can_be_deactivated: boolean;
    skills_count: number;
    service_requests_count: number;
  };
}

export interface ServiceRequestLocation {
  latitude: string;
  longitude: string;
  distance?: number;
}

export interface ServiceRequestBudget {
  amount: string;
  currency: string;
  formatted: string;
}

export interface ServiceRequestStatusInfo {
  code: ServiceRequestStatus;
  text: string;
  color?: string;
}

export interface ServiceRequestVisibilityInfo {
  code: ServiceRequestVisibility;
  text: string;
}

export interface ServiceRequestPriorityInfo {
  code: ServiceRequestPriority;
  text: string;
}

export interface ServiceRequestPaymentMethodInfo {
  code: ServiceRequestPaymentMethod;
  text: string;
}

export interface ServiceRequestTypeInfo {
  code: ServiceRequestType;
  text: string;
}

export interface ServiceRequestDates {
  due_date: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  completed_at?: string;
}

export interface ServiceRequestFlags {
  is_overdue: boolean;
  is_published: boolean;
  is_in_progress: boolean;
  is_completed: boolean;
  is_canceled: boolean;
  is_urgent: boolean;
  is_owner: boolean;
  has_offers: boolean;
}

export interface ServiceRequestMetadata {
  completion_notes?: string | null;
  completion_evidence?: string[];
  cancellation_reason?: string | null;
  completed_at?: string | null;
  additional_data?: unknown[];
}

export interface ServiceRequestRelationships {
  categories?: Category[];
  user?: User;
  offers?: FullServiceOffer[];
  contract?: ServiceContract;
  offers_count: number;
  has_contract: boolean;
}

export interface ServiceRequestPermissions {
  can_edit: boolean;
  can_delete: boolean;
  can_make_offer: boolean;
  can_cancel: boolean;
}

export interface ServiceOffer {
  id: number;
  amount: number;
  status: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceContract {
  id: number;
  status: string;
  start_date: string;
  end_date: string;
  terms: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceRequest {
  id: number;
  user_id: number;
  title: string;
  description: string;
  address: string;
  zip_code: string;
  location: ServiceRequestLocation;
  budget: ServiceRequestBudget;
  status: ServiceRequestStatusInfo;
  visibility: ServiceRequestVisibilityInfo;
  priority: ServiceRequestPriorityInfo;
  payment_method: ServiceRequestPaymentMethodInfo;
  service_type: ServiceRequestTypeInfo;
  dates: ServiceRequestDates;
  flags: ServiceRequestFlags;
  relationships: ServiceRequestRelationships;
  metadata?: Record<string, unknown>;
  deleted_at?: string | null;
}

export interface ServiceRequestData {
  title: string;
  description: string;
  address: string;
  zip_code: string;
  latitude: number;
  longitude: number;
  budget: number;
  visibility: ServiceRequestVisibility;
  priority: ServiceRequestPriority;
  payment_method: ServiceRequestPaymentMethod;
  service_type: ServiceRequestType;
  due_date: string | null;
  category_ids: number[];
}

export interface ServiceRequestResponse {
  success: boolean;
  message: string;
  data: {
    items: ServiceRequest[];
    meta?: {
      pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        has_more_pages: boolean;
      };
      filters?: {
        available_statuses: Record<string, string>;
        available_priorities: Record<string, string>;
        available_payment_methods: Record<string, string>;
        available_serviceRquest_types: Record<string, string>;
        available_visibility: Record<string, string>;
      };
      applied_filters?: {
        sort_by: string;
        sort_direction: string;
      };
    };
  };
}

export interface ServiceRequestListProps {
  service_requests: ServiceRequest[];
  onServiceRequestClick?: (_serviceRequest: ServiceRequest) => void;
  onOffer?: (_serviceRequest: ServiceRequest) => void;
  onEditServiceRequest?: (_serviceRequest: ServiceRequest) => void;
  onDeleteServiceRequest?: (_serviceRequestId: number) => void;
  onRestoreServiceRequest?: (_serviceRequest: ServiceRequest) => void;
  onSearch?: (_searchTerm: string) => void;
  onSort?: (_sortField: string) => void;
  isLoading?: boolean;
  error?: string;
  title?: string;
  subtitle?: string;
  showCreateButton?: boolean;
  viewType?: "default" | "trash";
  filters?: {
    status?: ServiceRequestStatus;
    priority?: ServiceRequestPriority;
    sort?: string;
    search?: string;
    deleted_from?: string;
    deleted_to?: string;
  };
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (_page: number) => void;
    perPage?: number;
    onPerPageChange?: (_perPage: number) => void;
  };
}

export interface ServiceRequestCardProps {
  service: ServiceRequest;
  onView?: (_service: ServiceRequest) => void;
  onEdit?: (_id: number) => void;
  onDelete?: (_id: number) => void;
  onContact?: (_service: ServiceRequest) => void;
  onRestore?: (_service: ServiceRequest) => void;
  className?: string;
  isOwnRequest?: boolean;
  viewMode?: "grid" | "list";
}

export interface ServiceRequestDetailProps {
  service: ServiceRequest;
  onEdit?: (_serviceRquest: ServiceRequest) => void;
  onDelete?: (_serviceRquestId: number) => void;
  onContact?: (_serviceRquest: ServiceRequest) => void;
  onReport?: (_serviceRquest: ServiceRequest) => void;
  isLoading?: boolean;
  error?: string;
}

export interface ServiceRequestFormProps {
  initialData?: ServiceRequestData;
  onSubmit: (_data: ServiceRequestData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  mode?: "create" | "edit";
}

export interface ApiError {
  status: number;
  message: string;
  response?: {
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
    };
    status?: number;
  };
}
