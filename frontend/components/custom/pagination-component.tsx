"use client";

import { usePathname, useSearchParams } from "next/navigation";

import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination";

import { cn } from "@/lib/utils";
import { getVisiblePages } from "@/lib/pagination";

interface PaginationProps {
   pageCount: number;
   className?: string;
}

export function PaginationComponent({
   pageCount,
   className,
}: Readonly<PaginationProps>) {
   const pathname = usePathname();
   const searchParams = useSearchParams();

   const currentPage = Number(searchParams.get("page")) || 1;

   const createPageURL = (page: number) => {
      const params = new URLSearchParams(searchParams);

      params.set("page", page.toString());

      return `${pathname}?${params.toString()}`;
   };

   const { pages } = getVisiblePages(currentPage, pageCount);

   return (
      <Pagination className={cn(className)}>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious
                  href={createPageURL(currentPage - 1)}
                  aria-disabled={currentPage === 1}
                  className={cn(
                     currentPage === 1 && "pointer-events-none opacity-50",
                  )}
                  text="Anterior"
               />
            </PaginationItem>

            {pages.map((page, index) => (
               <PaginationItem key={`${page}-${index}`}>
                  {page === "ellipsis" ? (
                     <PaginationEllipsis className="pointer-events-none opacity-50" />
                  ) : (
                     <PaginationLink
                        href={createPageURL(page)}
                        isActive={page === currentPage}
                     >
                        {page}
                     </PaginationLink>
                  )}
               </PaginationItem>
            ))}

            <PaginationItem>
               <PaginationNext
                  href={createPageURL(currentPage + 1)}
                  aria-disabled={currentPage === pageCount}
                  className={cn(
                     currentPage === pageCount &&
                        "pointer-events-none opacity-50",
                  )}
                  text="Siguiente"
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
}
