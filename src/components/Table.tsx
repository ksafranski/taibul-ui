"use client";

  import React, { useState, useMemo, useEffect } from 'react';
  import { 
    ChevronUp, 
    ChevronDown, 
    ChevronsUpDown, 
    ChevronLeft, 
    ChevronRight,
 
  } from 'lucide-react';
  import { Button } from './Button';
  import { Text } from './Typography';

  export interface Column<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    render?: (value: any, item: T) => React.ReactNode;
    width?: string;
    align?: 'left' | 'center' | 'right';
  }

  interface TableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
    columns: Column<T>[];
    data: T[];
    pageSize?: number;
    className?: string;
    onRowClick?: (item: T) => void;
    emptyMessage?: string;
  }

  const TableInner = <T extends Record<string, any>>({ 
    columns, 
    data, 
    pageSize = 10,
    className = "",
    onRowClick,
    emptyMessage = "No data available",
    ...props
  }: TableProps<T>, ref: React.Ref<HTMLDivElement>) => {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | null }>({
      key: '',
      direction: null,
    });
    const [currentPage, setCurrentPage] = useState(1);

    // Sorting logic
    const sortedData = useMemo(() => {
      if (!sortConfig.key || !sortConfig.direction) return data;

      return [...data].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === bValue) return 0;
        
        const comparison = aValue < bValue ? -1 : 1;
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });
    }, [data, sortConfig]);

    // Pagination logic
    const totalPages = Math.ceil(sortedData.length / pageSize);

    useEffect(() => {
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
      } else if (totalPages === 0) {
        setCurrentPage(1);
      }
    }, [totalPages, currentPage]);

    const paginatedData = useMemo(() => {
      const start = (currentPage - 1) * pageSize;
      return sortedData.slice(start, start + pageSize);
    }, [sortedData, currentPage, pageSize]);

    const handleSort = (key: string) => {
      let direction: 'asc' | 'desc' | null = 'asc';
      if (sortConfig.key === key) {
        if (sortConfig.direction === 'asc') direction = 'desc';
        else if (sortConfig.direction === 'desc') direction = null;
      }
      setSortConfig({ key, direction });
      setCurrentPage(1); // Reset to first page on sort
    };

    const getSortIcon = (column: Column<T>) => {
      if (!column.sortable) return null;
      if (sortConfig.key !== column.key || !sortConfig.direction) {
        return <ChevronsUpDown size={14} className="text-muted-foreground/50" />;
      }
      return sortConfig.direction === 'asc' ? 
        <ChevronUp size={14} className="text-primary" /> : 
        <ChevronDown size={14} className="text-primary" />;
    };

    return (
      <div ref={ref} className={`w-full space-y-4 ${className}`} {...props}>
        <div className="w-full overflow-x-auto rounded-lg border border-border bg-background shadow-sm">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {columns.map((column) => (
                  <th 
                    key={column.key as string}
                    className={`
                      px-4 py-3 font-semibold text-foreground transition-colors
                      ${column.sortable ? 'cursor-pointer hover:bg-muted/50 select-none' : ''}
                      ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'}
                    `}
                    style={{ width: column.width }}
                    onClick={() => column.sortable && handleSort(column.key as string)}
                  >
                    <div className={`flex items-center gap-2 ${column.align === 'center' ? 'justify-center' : column.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                      {column.label}
                      {getSortIcon(column)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr 
                    key={index}
                    className={`
                      transition-colors hover:bg-muted/30
                      ${onRowClick ? 'cursor-pointer' : ''}
                    `}
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((column) => (
                      <td 
                        key={column.key as string}
                        className={`
                          px-4 py-3 text-secondary-foreground
                          ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'}
                        `}
                      >
                        {column.render ? 
                          column.render(item[column.key as string], item) : 
                          (item[column.key as string]?.toString() || '-')
                        }
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-12 text-center">
                    <Text variant="muted">{emptyMessage}</Text>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-2">
            <Text variant="small" className="text-muted-foreground">
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} results
            </Text>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                leftIcon={ChevronLeft}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "primary" : "ghost"}
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                rightIcon={ChevronRight}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  export const Table = React.forwardRef(TableInner) as <T extends Record<string, any>>(
    props: TableProps<T> & { ref?: React.Ref<HTMLDivElement> }
  ) => React.ReactElement;

  // Add displayName for debugging
  (Table as any).displayName = "Table";
