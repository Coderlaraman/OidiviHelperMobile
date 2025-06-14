// /src/lib/types/user/chat.ts

/**
 * Representa a un participante en el chat (solicitante o proveedor).
 * Coincide con los objetos `requester` y `offerer` del backend.
 */
export interface ChatParticipant {
  id: number;
  name: string;
  profile_photo_url?: string;
}

/**
 * Representa la información principal del chat.
 * Coincide con el objeto `chat` del backend.
 */
export interface ChatInfo {
  id: number;
  service_offer_id: number;
  created_at: string;
  updated_at: string;
  requester: ChatParticipant;
  offerer: ChatParticipant;
}

/**
 * Define los tipos de mensaje posibles, alineados con el backend.
 */
export type MessageType = "text" | "image" | "video" | "file";

/**
 * Representa un único mensaje de chat.
 * Este tipo debe coincidir EXACTAMENTE con la respuesta de la API para un mensaje
 * y con el payload emitido por Laravel Echo.
 */
export interface ChatMessage {
  id: number;
  chat_id: number; // Añadido para consistencia con el broadcast
  sender_id: number;
  sender_name: string;
  message: string | null; // El mensaje puede ser nulo si es un archivo
  type: MessageType;
  media_url: string | null;
  media_type: string | null;
  media_name: string | null;
  metadata: { width?: number; height?: number } | null;
  seen_at: string | null;
  created_at: string;
}

/**
 * Representa el payload completo devuelto por el endpoint GET /chat/offers/{offerId}.
 */
export interface ChatPayload {
  chat: ChatInfo;
  messages: ChatMessage[];
}

export interface ChatListItem {
  chat_id: number;
  service_offer_id: number;
  other_participant: {
    id: number;
    name: string;
    profile_photo_url: string | null;
  };
  last_message: {
    message: string | null;
    type: "text" | "image" | "video" | "file";
    created_at: string;
  };
  unread_count: number;
}

/**
 * El payload que se recibe a través de Laravel Echo cuando se envía un nuevo mensaje.
 * Es esencialmente un ChatMessage. Usamos un alias para claridad semántica.
 */
export type MessageBroadcastPayload = ChatMessage;
