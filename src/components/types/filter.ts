export interface FilterState {
  categories: number[];
  ingredients: string[];
  chefs: number[];
  sourceTypes: string[];
}

export interface Chef {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}
