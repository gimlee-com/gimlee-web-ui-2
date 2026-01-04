import React from 'react';
import { Pagination, PaginationItem, PaginationPrevious, PaginationNext } from './uikit/Pagination/Pagination';

interface SmartPaginationProps {
  currentPage: number; // 0-indexed
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const SmartPagination: React.FC<SmartPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className
}) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | string)[] = [];
    const range = 1; // number of pages to show around current page

    for (let i = 0; i < totalPages; i++) {
      if (
        i === 0 || // first
        i === totalPages - 1 || // last
        (i >= currentPage - range && i <= currentPage + range) // around current
      ) {
        pages.push(i);
      } else if (
        (i === 1 && currentPage - range > 1) ||
        (i === totalPages - 2 && currentPage + range < totalPages - 2)
      ) {
        if (pages[pages.length - 1] !== '...') {
          pages.push('...');
        }
      }
    }

    return pages;
  };

  const pages = getPages();

  return (
    <Pagination className={className}>
      <PaginationItem disabled={currentPage === 0}>
        <a href="#" onClick={(e) => { e.preventDefault(); if (currentPage > 0) onPageChange(currentPage - 1); }}>
          <PaginationPrevious />
        </a>
      </PaginationItem>
      
      {pages.map((page, index) => (
        <PaginationItem key={index} active={page === currentPage} disabled={page === '...'}>
          {page === '...' ? (
            <span>...</span>
          ) : (
            <a href="#" onClick={(e) => { e.preventDefault(); onPageChange(page as number); }}>
              {(page as number) + 1}
            </a>
          )}
        </PaginationItem>
      ))}

      <PaginationItem disabled={currentPage === totalPages - 1}>
        <a href="#" onClick={(e) => { e.preventDefault(); if (currentPage < totalPages - 1) onPageChange(currentPage + 1); }}>
          <PaginationNext />
        </a>
      </PaginationItem>
    </Pagination>
  );
};
