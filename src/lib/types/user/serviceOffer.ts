import { ServiceRequest } from "./serviceRequest"; // Importar ServiceRequest

export interface ServiceOffer {
  id: number;
  service_request_id: number;
  user_id: number;
  price_proposed: number;
  estimated_time: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    email: string;
    profile_photo_url: string | null;
    biography?: string;
    skills?: { name: string }[];
    location?: string;
  };
  serviceRequest: ServiceRequest; // Usar el tipo ServiceRequest completo
}

export interface CreateServiceOfferData {
  price_proposed: number;
  estimated_time: string;
  message: string;
}
