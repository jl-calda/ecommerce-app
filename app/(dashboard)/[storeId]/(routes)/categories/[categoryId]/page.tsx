import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/category-form";

interface CategoryPageProps {
  params: { storeId: string; categoryId: string };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const category = await prismadb.category.findFirst({
    where: {
      id: params.categoryId,
    },
  });
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm
          initialData={category}
          billboards={billboards}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
