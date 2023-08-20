import format from "date-fns/format";
import prismadb from "@/lib/prismadb";

import { ColorColumn } from "./components/columns";
import ColorsClient from "./components/client";

interface ColorsPageProps {
  params: { storeId: string };
}

const ColorsPage: React.FC<ColorsPageProps> = async ({ params }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
