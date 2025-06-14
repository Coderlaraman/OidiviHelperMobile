export type NotificationType =
  | "new_service_request"
  | "new_offer"
  | "offer_status_updated"
  | "service_request_status_updated"
  | "new_chat_message";

export interface Notification {
  id: string;
  type: NotificationType;
  timestamp: string;
  title?: string;
  message?: string;
  is_read: boolean;
  read_at?: string;
  created_at: string;
  updated_at: string;
  service_request?: {
    id: number;
    title: string;
    slug: string;
    description: string;
    budget: string;
    priority: string;
    service_type: string;
    created_at: string;
    status: string;
  };
  service_offer?: {
    // Agregamos la propiedad service_offer
    id: number;
    // Puedes agregar otros campos de ServiceOffer si son relevantes para la notificación
  };
  notification?: {
    title: string;
    message: string;
    action_url: string;
  };
}

export interface NotificationResponse {
  items: Notification[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    unread_count: number;
  };
}

export interface NotificationMeta {
  unread_count: number;
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
