"use client";

import Icons from "@/components/Icons";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useParams, useRouter } from "next/navigation";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${data.length})`}
          description="View orders for your store"
        />
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey="products"
      />
    </>
  );
};

export default OrderClient;
