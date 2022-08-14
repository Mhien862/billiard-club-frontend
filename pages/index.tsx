import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IProduct } from "../data/types";
import { apiProductList } from "../src/api/common";
import PageLayout from "../src/components/common/PageLayout";
import Slide from "../src/components/Home/Slide";
import { ProductList } from "../src/components/Products";

const Home: NextPage = () => {
  const [cuesList, setCuesList] = useState<IProduct[]>([]);
  const [tablesList, setTablesList] = useState<IProduct[]>([]);
  const [accessoriesList, setAccessoriesList] = useState<IProduct[]>([]);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const res = await apiProductList("pool-cues");
      setCuesList(res.slice(0, 5));
    })();
    (async () => {
      const res = await apiProductList("pool-tables");
      setTablesList(res.slice(0, 5));
    })();
    (async () => {
      const res = await apiProductList("pool-accessories");
      setAccessoriesList(res.slice(0, 5));
    })();
  }, []);

  return (
    <PageLayout>
      <div className="container mx-auto space-y-10">
        <Slide />
        <div>
          <div className="w-full">
            <h2
              className="text-2xl font-semibold text-start cursor-pointer hover:text-primary-100"
              onClick={() => {
                router.push("/pool-cues");
              }}
            >
              Pool Cues
            </h2>
            <ProductList products={cuesList} />
          </div>
          <div className="w-full">
            <h2
              className="text-2xl font-semibold text-start cursor-pointer hover:text-primary-100"
              onClick={() => {
                router.push("/pool-tables");
              }}
            >
              Pool Tables
            </h2>
            <ProductList products={tablesList} />
          </div>
          <div className="w-full">
            <h2
              className="text-2xl font-semibold text-start cursor-pointer hover:text-primary-100"
              onClick={() => {
                router.push("/pool-accessories");
              }}
            >
              Pool Accessories
            </h2>
            <ProductList products={accessoriesList} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
