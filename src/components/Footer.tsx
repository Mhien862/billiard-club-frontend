/**
 * @author: ThaiND
 * Created Date: Mon Jun 13 2022
 * @description:
 * @param:
 * @returns:
 * @example:
 */
import Image from "../components/common/Image";
import Link from "next/link";
import React from "react";
import logo from "../../assets/images/logo.png";
import BackToTop from "./BackToTop";

const Footer = () => {
  const footerEl = [
    {
      title: "Billiard Club",
      element: [
        {
          name: "About us",
          link: "/about-us",
        },
        {
          name: "Products",
          link: "/products",
        },
      ],
    },
    {
      title: "Contact us",
      element: [
        {
          name: "Phone: +849-868-868-868",
          link: "tel:+849-868-868-868",
        },
        {
          name: "Email: billiardclub@gmail.com",
          link: "mailto:billiardclub@gmail.com",
        },
      ],
    },
  ];
  return (
    <div>
      {/* Start Footer Area */}
      <footer className="w-full bg-primary-900">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 justify-between py-10">
            {footerEl.map((item, index) => (
              <div key={index} className="flex flex-col items-start px-5 py-10">
                {/* title */}
                <h3 className="flex flex-row items-center text-white mb-8">
                  <span className="absolute text-7xl font-medium opacity-25">
                    {item.title.charAt(0).toUpperCase()}
                  </span>
                  <span className="lg:text-xl text-base">
                    &nbsp;&nbsp;&nbsp;{item.title}
                  </span>
                </h3>
                {/* element */}
                <ul>
                  {item.element.map((element, index) => (
                    <li
                      key={index}
                      className="flex flex-col py-2 font-normal lg:text-base text-sm text-primary-300"
                    >
                      {element.link ? (
                        <Link href={element.link}>
                          {element.link.includes("http") ? (
                            <a
                              className="transition hover:translate-x-1 hover:text-white"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {element.name}
                            </a>
                          ) : (
                            <a className="transition hover:translate-x-1 hover:text-white">
                              {element.name}
                            </a>
                          )}
                        </Link>
                      ) : (
                        <span>{element.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className=" w-fill flex md:flex-col flex-row items-start px-5 lg:mt-10 mt-5">
              <Link href="/" passHref>
                <div className="relative lg:w-40 w-36 h-24 cursor-pointer">
                  <Image
                    src={logo}
                    alt="logo"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className="w-full border-t-[0.2px] py-6">
            <a
              className="text-gray-200 font-extralight text-sm"
              href="https://"
            >
              Copyright © 2022
            </a>
          </div>
        </div>
      </footer>
      {/* End Footer Area */}
      <BackToTop />
    </div>
  );
};

export default Footer;
