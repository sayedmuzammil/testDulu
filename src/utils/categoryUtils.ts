import dummyCategories from '@/data/dummyCategories';

export function getCategoryNames(ids: number[]): string[] {
  return ids.map((id) => dummyCategories[id] || `Category ${id}`);
}
