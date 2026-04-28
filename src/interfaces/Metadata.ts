export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number; // optional لأنه ممكن ميبقاش موجود في آخر صفحة
}
