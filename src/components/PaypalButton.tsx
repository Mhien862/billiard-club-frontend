import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { PayPalScriptOptions } from "@paypal/paypal-js/types/script-options";
import { PayPalButtonsComponentOptions } from "@paypal/paypal-js/types/components/buttons";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { cartListState, totalCartPriceState } from "../../data/globalState";
import { ICartItem } from "../../data/types";
import { apiAddOrder, apiAddOrderDetail } from "../api/customer";

const storeOrder = async (
  payment: string,
  userInfoId: string,
  cartList: ICartItem[]
) => {
  const order = await apiAddOrder(+userInfoId, payment, "Paid");
  if (order) {
    cartList.forEach((item) => {
      apiAddOrderDetail(order.orderId as number, +item.id, item.quantity);
    });
  }
};

const paypalScriptOptions: PayPalScriptOptions = {
  "client-id":
    "AZELecH0_x_tf5M5-JBhhFRKbS7turbC-adXpa5Q3m8WUGCMhwW-UHlm6Gn1dz446kyrUJ6c29CmX2_Z",
  currency: "USD",
};

interface IProps {
  amount: string;
  userInfoId: string;
}
const Button = ({ amount, userInfoId }: IProps) => {
  const router = useRouter();
  const cartList = useRecoilValue<ICartItem[]>(cartListState);
  const resetList = useResetRecoilState(cartListState);
  const resetTotal = useResetRecoilState(totalCartPriceState);

  const [{ isPending }] = usePayPalScriptReducer();
  const paypalbuttonTransactionProps: PayPalButtonsComponentOptions = {
    style: { layout: "vertical" },
    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: amount,
            },
          },
        ],
      });
    },
    async onApprove(data, actions) {
      const details = await actions.order.capture({});
      if (details.status === "COMPLETED") {
        toast.success("Payment successful");
        await storeOrder(`${amount}$ Paypal`, userInfoId, cartList);
        toast.success("Order successful");
        resetList();
        resetTotal();
        router.push("/");
      }
    },
  };
  return (
    <>
      {isPending ? <h2>Load Smart Payment Button...</h2> : null}
      <PayPalButtons {...paypalbuttonTransactionProps} />
    </>
  );
};

export default function PaypalButton({ amount, userInfoId }: IProps) {
  return (
    <div className="w-full flex items-center justify-center">
      <PayPalScriptProvider options={paypalScriptOptions}>
        <Button amount={amount} userInfoId={userInfoId} />
      </PayPalScriptProvider>
    </div>
  );
}
