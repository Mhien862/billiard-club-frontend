import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { cartListState, totalCartPriceState } from "../../../data/globalState";
import { ICartItem, IProduct } from "../../../data/types";
import { apiProductDetail } from "../../api/common";
import Image from "../common/Image";
import Input from "../common/Input";

interface IProps {
  productId: string;
  quantity: number;
  disabled?: boolean;
}
const CartItem = (props: IProps) => {
  const { productId, quantity, disabled = false } = props;
  const [cartList, setCartList] = useRecoilState<ICartItem[]>(cartListState);
  const [product, setProduct] = React.useState<IProduct>();
  const [total, setTotal] = useRecoilState<number>(totalCartPriceState);

  const router = useRouter();
  useEffect(() => {
    (async () => {
      const res = await apiProductDetail(+productId);
      setProduct(res);
    })();
  }, [productId]);

  return (
    <div>
      {product && (
        <div
          className={`flex flex-row items-center justify-between bg-white rounded p-4 my-2 ${
            disabled ? "" : "cursor-pointer"
          }`}
          onClick={() => {
            if (!disabled)
              router.push(`/${product.category}?product=${product.id}`);
          }}
        >
          <div className="relative w-24 h-24">
            <Image
              className="rounded-lg"
              height="100%"
              width="100%"
              layout="fill"
              objectFit="cover"
              src={product.image}
              alt={product.name}
            />
          </div>
          <div>{product.name}</div>
          <div className="flex flex-row items-center">
            <span className="text-red-400 mr-3">${product.price}</span>
            <Input
              onClick={(e) => {
                e.stopPropagation();
              }}
              type="number"
              value={quantity}
              className="w-12 text-right"
              disabled={disabled}
              onChange={(e) => {
                const newQuantity = +e.target.value;
                setTotal(total + (newQuantity - quantity) * product.price);
                if (newQuantity > 0) {
                  setCartList(
                    cartList.map((item) =>
                      item.id === productId
                        ? { ...item, quantity: newQuantity }
                        : item
                    )
                  );
                } else {
                  setCartList(cartList.filter((item) => item.id !== productId));
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
