export type PaginationItem = number | "ellipsis";

export interface VisiblePagesResult {
   pages: PaginationItem[];
}

export function getVisiblePages(
   currentPage: number,
   pageCount: number,
   siblingCount = 2,
): VisiblePagesResult {
   const maxItems = siblingCount * 2 + 5;
   // siblingCount 2:
   // 1 + ellipsis + 5 centrales + ellipsis + 1 = 9

   if (pageCount <= maxItems) {
      return {
         pages: Array.from({ length: pageCount }, (_, i) => i + 1),
      };
   }

   const pages: PaginationItem[] = [];

   const start = Math.max(currentPage - siblingCount, 1);

   const end = Math.min(currentPage + siblingCount, pageCount);

   const showLeftEllipsis = currentPage > siblingCount + 3;

   const showRightEllipsis = currentPage < pageCount - siblingCount - 2;

   // ------------------
   // Inicio
   // ------------------
   if (!showLeftEllipsis) {
      const visibleCount = maxItems - 2;
      // quitamos:
      // ellipsis + última página

      for (let i = 1; i <= visibleCount; i++) {
         pages.push(i);
      }

      pages.push("ellipsis");
      pages.push(pageCount);

      return { pages };
   }

   // ------------------
   // Final
   // ------------------
   if (!showRightEllipsis) {
      const visibleCount = maxItems - 2;

      pages.push(1);
      pages.push("ellipsis");

      const start = pageCount - visibleCount + 1;

      for (let i = start; i <= pageCount; i++) {
         pages.push(i);
      }

      return { pages };
   }

   // ------------------
   // Centro
   // ------------------
   pages.push(1);
   pages.push("ellipsis");

   for (let i = start; i <= end; i++) {
      pages.push(i);
   }

   pages.push("ellipsis");
   pages.push(pageCount);

   return { pages };
}
