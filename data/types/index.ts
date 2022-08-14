/**
 * @author: ThaiND
 * Created Date: Mon Jun 13 2022
 * @description:
 * @param:
 * @returns:
 * @example:
 */

export interface IPageLayoutProps {
  children?: React.ReactNode;
  title?: any;
}

export interface IUserAccount {
  userAccount: {
    id: string;
    username: string;
    rule: string;
  };
  isLoggedIn: boolean;
  error: string;
}

export interface ICartItem {
  id: string;
  quantity: number;
}

export interface IProductOrder {
  id: string;
  amount: number;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  details?: string;
  quantity: number;
  category?: string;
  amount?: number;
}
