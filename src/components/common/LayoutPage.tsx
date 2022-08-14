/**
 * @author: ThaiND
 * Created Date: Mon Jun 13 2022
 * @description:
 * @param: {}
 * @returns:
 * @example:
 */
import Head from "next/head";
import { IPageLayoutProps } from "../../../data/types";
import Footer from "../Footer";
import Header from "../Header";

const LayoutPage = ({ children, title }: IPageLayoutProps) => {
  const defaultTitle = "Trang chủ";
  return (
    <div>
      <Head>
        <title>{title || defaultTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default LayoutPage;
