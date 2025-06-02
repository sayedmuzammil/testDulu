import type { Ingredient } from './ingredients';

export type Recipe = {
  id: number;
  title: string;
  description: string;
  categoryIds: number[];
  ingredients: Ingredient[];
  steps: string[];
  chefId: number;
  videoUrl?: string; //  embedded video
  imageUrl?: string; //  image preview
  sourceUrl?: string; //  external source link
  sourceType?: 'Youtube' | 'instagram' | 'website'; // (YouTube, Instagram, Web, etc.)
  createdBy: number; // userId
  createdAt: string;
  updatedAt?: string;
};
