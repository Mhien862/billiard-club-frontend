/**
 * @author: ThaiND
 * Created Date: Mon Jun 13 2022
 * @description:
 * @param:
 * @returns:
 * @example:
 */
import { MenuIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import logo from "../../assets/images/logo.png";
import { cartListState, userAccountState } from "../../data/globalState";
import Image from "../components/common/Image";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const user = useRecoilValue(userAccountState);
  const cart = useRecoilValue(cartListState);

  const headerEl = [
    {
      title: "Home",
      link: "/",
      element: [],
    },
    {
      title:
        user.userAccount.rule === "customer" || user.userAccount.rule === ""
          ? "Product"
          : "Management",
      link: "",
      element:
        user.userAccount.rule === "customer" || user.userAccount.rule === ""
          ? [
              {
                name: "Pool cues",
                link: "/pool-cues",
              },
              {
                name: "Pool tables",
                link: "/pool-tables",
              },
              {
                name: "Pool accessories",
                link: "/pool-accessories",
              },
            ]
          : [
              {
                name: "Manage products",
                link: "/manage-products",
              },
              {
                name: "Manage orders",
                link: "/manage-orders",
              },
            ],
    },
    {
      title: user.isLoggedIn ? "Account" : "Login",
      link: user.isLoggedIn ? "" : "/login",
      element: user.isLoggedIn
        ? [
            {
              name: "My account",
              link: "/account",
            },
            {
              name: "Logout",
              link: "/logout",
            },
          ]
        : [],
    },
  ];

  return (
    <div className="header bg-white">
      <header>
        <div className="container mx-auto">
          <div className="flex lg:flex-row flex-col items-center justify-between">
            <div className="lg:w-auto w-full flex flex-row items-center justify-between">
              <Link href="/" passHref>
                <div className="cursor-pointer relative w-32 h-12 lg:w-40 lg:h-20">
                  <Image
                    src={logo}
                    alt="logo"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </Link>
              <div
                className="cursor-pointer lg:hidden block"
                onClick={() => setIsOpen(!isOpen)}
              >
                <MenuIcon className="w-10" />
              </div>
            </div>
            <div
              className={`collapsible w-2/3 lg:p-6 p-2 flex lg:flex-row flex-col lg:items-center items-start justify-between 
              font-semibold lg:text-base text-sm text-center text-primary-100
              ${isOpen ? "max-h-screen" : "max-h-0"}`}
            >
              {headerEl.map((item, index) => (
                <div key={index} className="lg:mx-5 m-2">
                  {item.link ? (
                    <div
                      className={`hover:text-primary-400 ${
                        router.asPath == item.link ? "text-primary-500" : ""
                      }`}
                    >
                      <Link href={item.link}>
                        {item.link.includes("http") ? (
                          <a target="_blank" rel="noreferrer">
                            {item.title}
                          </a>
                        ) : (
                          <a>{item.title}</a>
                        )}
                      </Link>
                    </div>
                  ) : (
                    <div className="dropdown">
                      <span className="hover:text-primary-400 cursor-pointer font-base flex items-center">
                        {item.title}
                        <svg
                          className="lg:hidden block ml-1 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </span>
                      <div className="dropdown-menu invisible translate-y-4 absolute z-10 w-56 rounded shadow bg-white">
                        <ul className="text-left">
                          {item.element.map((element, index) => (
                            <li key={index} className="mx-2 my-4">
                              <div className="hover:text-primary-400">
                                <Link href={element.link}>
                                  {element.link.includes("http") ? (
                                    <a target="_blank" rel="noreferrer">
                                      {element.name}
                                    </a>
                                  ) : (
                                    <a>{element.name}</a>
                                  )}
                                </Link>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Link href="/cart" passHref>
                <div className="relative lg:hidden flex items-center cursor-pointer">
                  <ShoppingCartIcon className="w-10 text-gray-400" />
                  {cart.length > 0 && (
                    <div className="absolute w-full h-full flex items-start justify-end ">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center bg-red-400 text-white text-sm">
                        {cart.length}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </div>
            <Link href="/cart" passHref>
              <div className="relative lg:flex hidden items-center cursor-pointer">
                <ShoppingCartIcon className="w-10 text-gray-400" />
                {cart.length > 0 && (
                  <div className="absolute w-full h-full flex items-start justify-end">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center bg-red-400 text-white text-sm">
                      {cart.length}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
