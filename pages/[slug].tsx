import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IProduct } from "../data/types";
import { apiProductDetail, apiProductList } from "../src/api/common";
import PageLayout from "../src/components/common/PageLayout";
import { ProductList } from "../src/components/Products";
import ProductDetails from "../src/components/Products/ProductDetails";

const Products = () => {
  const router = useRouter();
  const { slug } = router.query;
  const product = router.query["product"];
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [ProductDetail, setProductDetail] = useState<IProduct>();
  useEffect(() => {
    setProductList([]);
    (async () => {
      if (slug) {
        const category = slug.toString();
        if (
          ["pool-cues", "pool-tables", "pool-accessories"].includes(category)
        ) {
          const res = await apiProductList(slug as string);
          setProductList(res);
        } else {
          const res = await apiProductList("all");
          setProductList(res);
        }
      }

      if (product) {
        const res = await apiProductDetail(+(product as string));
        setProductDetail(res);
      }
    })();
  }, [product, slug]);

  return (
    <PageLayout>
      <div className="container mx-auto flex flex-col items-center justify-center my-10">
        {product ? (
          <div className="w-full">
            <ProductDetails product={ProductDetail} />
          </div>
        ) : (
          <div className="w-full">
            <h1 className="text-2xl font-semibold text-start cursor-pointer hover:text-primary-100">
              {slug ? slug : "All Products"}
            </h1>
            <ProductList products={productList} />
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Products;
