import { Skill } from "./skill"; // Reutilizamos el tipo Skill
import { Review } from "./review"; // Importamos el tipo Review completo

// Definir el tipo para UserStat si no existe
export interface UserStat {
  completed_tasks: number;
  active_services: number;
  total_earnings: number;
  rating: number;
  // Agregar otros campos de estadísticas si son públicos
}

// Definir el tipo para el perfil público
export interface PublicProfile {
  id: number;
  name: string;
  profile_photo_url: string | null;
  biography: string | null;
  skills: Skill[];
  stats: UserStat | null;
  reviews_received: Review[]; // Usamos el tipo Review importado
  // Agregar otros campos públicos si se definen en el futuro
}
