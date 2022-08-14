/**
 * @author ThaiND
 * Created at Sun Jun 19 2022
 * @description
 * @param
 * @returns
 * @example
 */

import Head from "next/head";
import { IPageLayoutProps } from "../../../data/types";
import Footer from "../Footer";
import Header from "../Header";

const PageLayout = ({ children, title }: IPageLayoutProps) => {
  return (
    <div>
      <Head>
        <title>{title || "Billiard-Club | Pro Billiard Shop"}</title>
      </Head>
      <main className="min-h-screen flex flex-col justify-between">
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default PageLayout;
