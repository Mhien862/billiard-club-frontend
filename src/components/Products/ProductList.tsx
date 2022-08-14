/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { cartListState, totalCartPriceState } from "../../../data/globalState";
import { ICartItem, IProduct } from "../../../data/types";
import Card from "../common/Card";
import Image from "../common/Image";

interface IProductListProps {
  products: IProduct[];
  onClick?: (product: IProduct) => void;
  buttonText?: string;
}
const ProductList = ({
  products,
  onClick,
  buttonText = "Add to cart",
}: IProductListProps) => {
  const router = useRouter();
  const [cart, setCart] = useRecoilState(cartListState);
  const [total, setTotal] = useRecoilState<number>(totalCartPriceState);

  return (
    <div className="w-full pb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products &&
        products.map((product, index) => (
          <Card key={index} className="h-full cursor-auto">
            <div
              className="h-full w-full flex flex-col items-center justify-center cursor-pointer"
              onClick={() => {
                router.push(`/${product.category}?product=${product.id}`);
              }}
            >
              <div className="relative w-full h-64">
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
              <span className="text-xl mt-2 font-semibold">{product.name}</span>
              <span className="text-sm text-gray-600">$ {product.price}</span>
            </div>
            <div className="mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onClick) {
                    onClick(product);
                  } else {
                    const newCart: ICartItem[] = [
                      ...cart,
                      {
                        id: product.id,
                        quantity: 1,
                      },
                    ];
                    setCart(newCart);
                    setTotal(total + product.price);
                    toast.success(product.name + " added to cart", {
                      position: "top-right",
                      autoClose: 1000,
                      hideProgressBar: true,
                      closeOnClick: true,
                    });
                  }
                }}
              >
                {buttonText}
              </button>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default ProductList;
