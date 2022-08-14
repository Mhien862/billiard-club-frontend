import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { cartListState, totalCartPriceState } from "../data/globalState";
import { ICartItem } from "../data/types";
import CartItem from "../src/components/cart/CartItem";
import Button from "../src/components/common/Button";
import PageLayout from "../src/components/common/PageLayout";

const Cart: NextPage = () => {
  const cartList = useRecoilValue<ICartItem[]>(cartListState);
  const total = useRecoilValue<number>(totalCartPriceState);
  const resetList = useResetRecoilState(cartListState);
  const resetTotal = useResetRecoilState(totalCartPriceState);
  const router = useRouter();
  return (
    <PageLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold mt-10 text-center">Cart</h1>
        <div className="space-y-5 py-5">
          {cartList.map((item, index) => (
            <div key={index}>
              <CartItem productId={item.id} quantity={item.quantity} />
            </div>
          ))}
          <div className="text-xl text-red-500 font-semibold text-right">
            Total: ${total}
          </div>
          <div className="flex flex-row items-center justify-between">
            <Button
              className="bg-red-400"
              onClick={() => {
                resetList();
                resetTotal();
              }}
            >
              Clear Cart
            </Button>
            <Button
              onClick={() => {
                router.push("/payment");
              }}
              disabled={cartList.length === 0}
            >
              Continue to Payment
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Cart;
