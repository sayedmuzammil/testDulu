import dummyCategories from '@/data/dummyCategories';

export function getCategoryNames(ids: number[]) {
  return ids.map((id) => dummyCategories[id] || `Category ${id}`);
}
