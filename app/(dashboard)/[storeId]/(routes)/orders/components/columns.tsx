"use client";

import { ColumnDef } from "@tanstack/react-table";

import Icons from "@/components/Icons";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.isPaid ? (
          <Icons.CheckCircle className="text-green-500" />
        ) : (
          <Icons.XCircle className="text-red-500" />
        )}
        {row.original.isPaid ? "Yes" : "No"}
      </div>
    ),
  },
];
