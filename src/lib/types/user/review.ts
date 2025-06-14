// src/lib/types/user/review.ts

import { PublicProfile } from "./publicProfile";
import { ServiceRequest } from "./serviceRequest";

export interface Review {
  id: number;
  reviewer: PublicProfile;
  reviewed: PublicProfile;
  service_request: ServiceRequest;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
}
