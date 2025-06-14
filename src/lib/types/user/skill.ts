import { Category } from "../user/category";

export interface Skill {
  id: number;
  name: string;
  description: string;
  categories: Category[];
  created_at: string;
  updated_at: string;
}

export interface UserSkill extends Skill {
  experience_level: number;
  last_updated_at: string;
}
