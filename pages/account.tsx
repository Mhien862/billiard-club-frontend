import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { userAccountState } from "../data/globalState";
import {
  apiRegisterInfo,
  apiUserInfo,
  apiAddOrder,
  apiAddOrderDetail,
  apiGetUserOrder,
  apiGetOrderDetail,
} from "../src/api/customer";
import Button from "../src/components/common/Button";
import PageLayout from "../src/components/common/PageLayout";
import AddNewAddress from "../src/components/Modal/AddNewAddress";

const Account = () => {
  const user = useRecoilValue(userAccountState);
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [orderDetails, setOrderDetails] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await apiUserInfo(user.userAccount.id);
      setUserInfo(res.user.userInfo);
      const res2 = await apiGetUserOrder(user.userAccount.id);
      setOrders(res2.orders);
      const orderDetail = await Promise.all(
        res2.orders.map(async (order: any) => {
          const res3 = await apiGetOrderDetail(order.id);
          return res3.orderDetail;
        })
      );
      setOrderDetails(orderDetail);
    })();
    if (!user.isLoggedIn) {
      toast.error("Please login to continue");
      router.push("/");
    }
  }, [user, router]);

  return (
    <PageLayout>
      <div className="container mx-auto flex flex-col items-center justify-center my-10">
        <h1 className="text-2xl font-semibold mb-10 text-center">Account</h1>
        <div className=" w-full grid grid-cols-1 gap-2 lg:grid-cols-3">
          <div className="col-span-2 max-h-screen overflow-y-auto flex flex-col bg-white rounded-xl items-center justify-center py-4 space-y-5">
            <h2 className="text-lg font-semibold text-center">Order list</h2>
            <div className="w-full">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg mx-2 mb-2 p-4"
                >
                  <div className="flex flex-row justify-between">
                    <span>
                      <span className="text-gray-600">Order ID: </span>
                      {order.id}
                    </span>
                    <span>
                      <span className="text-gray-600">Order status:</span>
                      {order.status}
                    </span>
                  </div>
                  {orderDetails[index] &&
                    orderDetails[index].map((orderDetail: any, index: any) => (
                      <Link
                        href="/product/[id]"
                        as={`/product/${orderDetail.productId}`}
                        key={index}
                      >
                        <a className="flex flex-row justify-between">
                          <span>
                            <span className="text-gray-600">Product name:</span>
                            {orderDetail.productName}
                          </span>
                          <span>
                            <span className="text-gray-600">Price:</span>
                            {orderDetail.productPrice}
                          </span>
                          <span>
                            <span className="text-gray-600">
                              Product quantity:
                            </span>
                            {orderDetail.amount}
                          </span>
                        </a>
                      </Link>
                    ))}
                  <div className="flex flex-row justify-between">
                    <span>
                      <span className="text-gray-600">Order date:</span>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </span>
                    <span>
                      <span className="text-gray-600">Total:</span>
                      {order.orderPayment}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="max-h-screen overflow-y-auto flex flex-col bg-white rounded-xl items-center justify-center py-4 space-y-5">
            <h2 className="text-lg font-semibold text-center">Address list</h2>
            <div className="w-full">
              {userInfo.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg mx-2 mb-2 p-4"
                >
                  <p>Name: {item.name}</p>
                  <p>Address: {item.address}</p>
                  <p>Phone: {item.phone}</p>
                  <p>Date of Birth: {item.dayOfBirth}</p>
                </div>
              ))}
            </div>
            <Button
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Add new address
            </Button>
          </div>
        </div>
      </div>
      <AddNewAddress
        isOpen={modalIsOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        onClick={() => {
          setIsOpen(false);
        }}
      />
    </PageLayout>
  );
};

export default Account;
