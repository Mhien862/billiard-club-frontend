import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  cartListState,
  totalCartPriceState,
  userAccountState,
} from "../data/globalState";
import { ICartItem } from "../data/types";
import { apiUserInfo } from "../src/api/customer";
import CartItem from "../src/components/cart/CartItem";
import Button from "../src/components/common/Button";
import PageLayout from "../src/components/common/PageLayout";
import AddNewAddress from "../src/components/Modal/AddNewAddress";
import PaypalButton from "../src/components/PaypalButton";

const Payment: NextPage = () => {
  const cartList = useRecoilValue<ICartItem[]>(cartListState);
  const total = useRecoilValue<number>(totalCartPriceState);
  const user = useRecoilValue(userAccountState);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [userInfo, setUserInfo] = useState<any[]>([]);
  const [address, setAddress] = useState<any>(userInfo[0]);

  useEffect(() => {
    (async () => {
      const res = await apiUserInfo(user.userAccount.id);
      setUserInfo(res.user.userInfo);
      setAddress(res.user.userInfo[0]);
    })();
  }, [user]);

  return (
    <PageLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold mt-10 text-center">Payment</h1>
        <div className="py-5 w-full grid grid-cols-1 gap-2 lg:grid-cols-3">
          <div className="col-span-2 w-full max-h-96 overflow-y-auto flex flex-col bg-white rounded-xl items-center justify-center py-4 space-y-5">
            {cartList.map((item, index) => (
              <div key={index} className="opacity-70 w-full">
                <CartItem
                  productId={item.id}
                  quantity={item.quantity}
                  disabled
                />
              </div>
            ))}
          </div>
          <div className="max-h-96 overflow-y-auto flex flex-col bg-white rounded-xl items-center justify-center py-4 space-y-5">
            <h2 className="text-lg font-semibold text-center">
              Choose address
            </h2>
            <div className="w-full">
              {userInfo.map((item, index) => (
                <div
                  key={index}
                  className={`bg-gray-50 rounded-lg mx-2 mb-2 p-4 cursor-pointer ${
                    address?.userInfoId === item.userInfoId
                      ? "bg-green-100 border-2 border-green-200"
                      : ""
                  }`}
                  onClick={() => {
                    setAddress(item);
                  }}
                >
                  <p>Name: {item.name}</p>
                  <p>Address: {item.address}</p>
                  <p>Phone: {item.phone}</p>
                  <p>Email: {item.email}</p>
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
        <div>
          <div className="text-xl text-red-500 font-semibold text-right">
            Total: ${total}
          </div>
          <PaypalButton
            amount={total.toString()}
            userInfoId={address?.userInfoId}
          />
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

export default Payment;
