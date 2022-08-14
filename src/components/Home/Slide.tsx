import React, { useEffect, useState } from "react";
import { IProduct } from "../../../data/types";
import { apiProductList } from "../../api/common";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "../common/Image";
import { useRouter } from "next/router";

const Slide = () => {
  const [productList, setProductList] = useState<IProduct[]>([]);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const res = await apiProductList("all");
      setProductList(res);
    })();
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className=""
      >
        {productList.map((product, index) => (
          <SwiperSlide key={index}>
            <div
              className="flex flex-col items-center justify-center py-5 cursor-pointer"
              onClick={() => {
                router.push(`/${product.category}?product=${product.id}`);
              }}
            >
              <div className="relative w-full h-80">
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
              <h2 className="text-2xl font-semibold text-center">
                {product.name}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slide;
