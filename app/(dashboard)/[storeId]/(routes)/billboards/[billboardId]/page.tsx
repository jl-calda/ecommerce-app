import prismadb from "@/lib/prismadb";
import BillboardForm from "./components/billboard-form";

interface BillboardPageProps {
  params: { storeId: string; billboardId: string };
}

const BillboardPage: React.FC<BillboardPageProps> = async ({ params }) => {
  const billboard = await prismadb.billboard.findFirst({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
