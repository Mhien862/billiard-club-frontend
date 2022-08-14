import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { userAccountState } from "../data/globalState";
import { IProduct } from "../data/types";
import { apiProductList } from "../src/api/common";
import {
  apiRegisterInfo,
  apiUserInfo,
  apiAddOrder,
  apiAddOrderDetail,
} from "../src/api/customer";
import Button from "../src/components/common/Button";
import Image from "../src/components/common/Image";
import PageLayout from "../src/components/common/PageLayout";
import AddNewAddress from "../src/components/Modal/AddNewAddress";
import AddNewProduct from "../src/components/Modal/AddNewProduct";
import EditProduct from "../src/components/Modal/EditProduct";
import { ProductList } from "../src/components/Products";

const ManageProduct = () => {
  const user = useRecoilValue(userAccountState);
  const router = useRouter();
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    setProductList([]);
    (async () => {
      const res = await apiProductList("all");
      setProductList(res);
    })();
    // if (!user.isLoggedIn) {
    //   toast.error("Please login to continue");
    //   router.push("/");
    // }
  }, [user, router, isAddOpen, isEditOpen]);

  const handleEditProduct = async (productId: string) => {
    setEditId(productId);
    setIsEditOpen(true);
  };

  return (
    <PageLayout>
      <div className="container mx-auto flex flex-col items-center justify-center my-10">
        <h1 className="text-2xl font-semibold mb-10 text-center">
          Manage Product
        </h1>
        <div className=" w-full relative">
          <div className="max-h-screen overflow-y-auto flex flex-col bg-white rounded-xl items-center justify-center py-4 space-y-5">
            <h2 className="text-lg font-semibold text-center">Product list</h2>
            <div className="w-full">
              <ProductList
                products={productList}
                buttonText="Edit"
                onClick={(product) => {
                  handleEditProduct(product.id);
                }}
              />
            </div>
            <div className="w-full absolute top-0 flex justify-center">
              <Button
                onClick={() => {
                  setIsAddOpen(true);
                }}
              >
                Add new product
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AddNewProduct
        isOpen={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
        }}
        onClick={() => {
          setIsAddOpen(false);
        }}
      />
      <EditProduct
        editId={+editId}
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
        }}
        onClick={() => {
          setIsEditOpen(false);
        }}
      />
    </PageLayout>
  );
};

export default ManageProduct;
