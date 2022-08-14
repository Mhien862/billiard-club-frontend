import React from "react";
import ReactMarkdown from "react-markdown";
import { IProduct } from "../../../data/types";
import Image from "../common/Image";

interface IProps {
  product?: IProduct;
}
const ProductDetails = (props: IProps) => {
  const { product } = props;

  return (
    <div>
      <div className="flex flex-col items-center justify-center my-10">
        {product && (
          <div className="w-full">
            <div className="flex flex-col lg:flex-row items-start justify-start">
              <div className="relative w-full lg:w-3/5 h-64 lg:h-96 border rounded-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="rounded-lg"
                  height="100%"
                  width="100%"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="w-full lg:w-2/5 px-0 lg:px-4 flex flex-col">
                <span className="text-xl font-semibold">{product.name}</span>
                <span className="text-sm text-gray-600">$ {product.price}</span>
                <span className="text-sm text-gray-600">
                  In Stock: {product.amount}
                </span>
              </div>
            </div>
            <ReactMarkdown>{product.details || "no details"}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
