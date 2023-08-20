import prismadb from "@/lib/prismadb";
import ProductForm from "./components/product-form";

interface ProductPageProps {
  params: { storeId: string; productId: string };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const product = await prismadb.product.findFirst({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          categories={categories}
          colors={colors}
          sizes={sizes}
        />
      </div>
    </div>
  );
};

export default ProductPage;
