"use client";

import { ColumnDef } from "@tanstack/react-table";

import CellAction from "./cell-action";
import Icons from "@/components/Icons";

export type ProductColumn = {
  id: string;
  name: string;
  isFeatured: boolean;
  isArchived: boolean;
  category: string;
  price: string;
  size: string;
  color: string;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.isArchived ? (
          <Icons.CheckCircle className="text-green-500" />
        ) : (
          <Icons.XCircle className="text-red-500" />
        )}
        {row.original.isArchived ? "Yes" : "No"}
      </div>
    ),
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.isFeatured ? (
          <Icons.CheckCircle className="text-green-500" />
        ) : (
          <Icons.XCircle className="text-red-500" />
        )}
        {row.original.isFeatured ? "Yes" : "No"}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
