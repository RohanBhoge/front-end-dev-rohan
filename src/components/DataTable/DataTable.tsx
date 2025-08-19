import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Check, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

// --- TYPE DEFINITIONS ---
// Based on the assignment requirements [cite: 46-51]
export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

// --- COMPONENT IMPLEMENTATION ---
export const DataTable = <T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'ascending' | 'descending';
  }>({ key: null, direction: 'ascending' });

  const [selection, setSelection] = useState(new Set<T['id']>());

  // Memoize the sorted data to avoid re-calculating on every render
  const sortedData = useMemo(() => {
    const sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const handleSort = (key: keyof T) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleSelect = (rowId: T['id']) => {
    const newSelection = new Set(selection);
    if (newSelection.has(rowId)) {
      newSelection.delete(rowId);
    } else {
      newSelection.add(rowId);
    }
    setSelection(newSelection);
    onRowSelect?.(data.filter((row) => newSelection.has(row.id)));
  };

  const handleSelectAll = () => {
    if (selection.size === data.length) {
      setSelection(new Set());
      onRowSelect?.([]);
    } else {
      const newSelection = new Set(data.map((row) => row.id));
      setSelection(newSelection);
      onRowSelect?.(data);
    }
  };

  const isAllSelected = selection.size === data.length && data.length > 0;
  const isPartialSelected = selection.size > 0 && selection.size < data.length;

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-neutral-200">
      <table className="w-full text-sm text-left text-neutral-600">
        <thead className="text-xs text-neutral-700 uppercase bg-neutral-50">
          <tr>
            {selectable && (
              <th scope="col" className="p-4">
                <div
                  onClick={handleSelectAll}
                  className={cn(
                    'w-5 h-5 border rounded-md flex items-center justify-center cursor-pointer',
                    isAllSelected || isPartialSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-neutral-300'
                  )}
                >
                  {isAllSelected && <Check size={16} />}
                  {isPartialSelected && <Minus size={16} />}
                </div>
              </th>
            )}
            {columns.map((column) => (
              <th key={column.key} scope="col" className="px-6 py-3">
                <div
                  className={cn(
                    'flex items-center',
                    column.sortable && 'cursor-pointer select-none'
                  )}
                  onClick={() => column.sortable && handleSort(column.dataIndex)}
                >
                  {column.title}
                  {column.sortable && (
                    <ArrowUpDown
                      className="ml-2 h-4 w-4 text-neutral-400"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            // Loading Skeleton
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="bg-white border-b animate-pulse">
                {selectable && <td className="p-4"><div className="w-5 h-5 bg-neutral-200 rounded-md" /></td>}
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4">
                     <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                  </td>
                ))}
              </tr>
            ))
          ) : sortedData.length === 0 ? (
            // Empty State
            <tr className="bg-white border-b">
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="px-6 py-12 text-center text-neutral-500"
              >
                No data available.
              </td>
            </tr>
          ) : (
            // Data Rows
            sortedData.map((row) => (
              <tr
                key={row.id}
                className="bg-white border-b hover:bg-neutral-50"
              >
                {selectable && (
                  <td className="p-4">
                     <div
                        onClick={() => handleSelect(row.id)}
                        className={cn(
                          'w-5 h-5 border rounded-md flex items-center justify-center cursor-pointer',
                           selection.has(row.id) ? 'bg-blue-600 border-blue-600 text-white' : 'border-neutral-300'
                        )}
                      >
                       {selection.has(row.id) && <Check size={16} />}
                      </div>
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4">
                    {String(row[column.dataIndex])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};