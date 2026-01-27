import React from 'react';
import { Breadcrumb, BreadcrumbItem } from '../../../components/uikit/Breadcrumb/Breadcrumb';
import type { CategoryPathElementDto } from '../../../types/api';

interface CategoryBreadcrumbsProps {
  path: CategoryPathElementDto[];
  onCategoryClick?: (id: number) => void;
  className?: string;
}

export const CategoryBreadcrumbs: React.FC<CategoryBreadcrumbsProps> = ({ 
  path, 
  onCategoryClick,
  className 
}) => {
  if (!path || path.length === 0) return null;

  return (
    <Breadcrumb className={className}>
      {path.map((cat, index) => (
        <BreadcrumbItem key={cat.id} disabled={index === path.length - 1 && !onCategoryClick}>
          {onCategoryClick ? (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onCategoryClick(cat.id);
              }}
            >
              {cat.name}
            </a>
          ) : (
            <span>{cat.name}</span>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
