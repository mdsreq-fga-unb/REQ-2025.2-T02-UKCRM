import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  canDelete?: (item: T) => boolean;
  className?: string;
  striped?: boolean;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  onEdit,
  onDelete,
  canDelete,
  className,
  striped = true,
}: DataTableProps<T>) {
  return (
    <div className={cn("rounded-lg border border-border bg-card overflow-hidden", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary border-none">
            {columns.map((column) => (
              <TableHead
                key={String(column.key)}
                className={cn(
                  "text-primary-foreground font-bold text-sm",
                  column.className
                )}
              >
                {column.header}
              </TableHead>
            ))}
            {(onEdit || onDelete) && (
              <TableHead className="text-primary-foreground font-bold text-sm text-right">
                Ações
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                className="h-24 text-center text-muted-foreground"
              >
                Nenhum registro encontrado.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => (
              <TableRow 
                key={item.id} 
                className={cn(
                  "border-b border-border",
                  striped && index % 2 === 1 && "bg-muted/30"
                )}
              >
                {columns.map((column) => (
                  <TableCell key={String(column.key)} className={column.className}>
                    {column.render
                      ? column.render(item)
                      : String(item[column.key as keyof T] ?? "")}
                  </TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(item)}
                          className="text-primary hover:text-primary hover:bg-primary/10 gap-1"
                        >
                          <Pencil className="h-4 w-4" />
                          Editar
                        </Button>
                      )}
                      {onDelete && (canDelete ? canDelete(item) : true) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(item)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1"
                        >
                          <Trash2 className="h-4 w-4" />
                          Apagar
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
