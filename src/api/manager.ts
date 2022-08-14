import axios from "axios";
import { BASE_URL } from "./common";

export const apiAddProduct = async (
  name: string,
  price: number,
  amount: number,
  details: string,
  image: string,
  category: string
) => {
  const res = await axios.post(`${BASE_URL}/api/add-product`, {
    name,
    price,
    amount,
    details,
    image,
    category,
  });

  return res;
};

export const apiUpdateProduct = async (
  productId: number,
  name: string,
  price: number,
  amount: number,
  details: string,
  image: string,
  category: string
) => {
  const res = await axios.put(`${BASE_URL}/api/update-product`, {
    productId,
    name,
    price,
    amount,
    details,
    image,
    category,
  });

  return res;
};

export const apiDeleteProduct = async (productId: number) => {
  const res = await axios.delete(`${BASE_URL}/api/delete-product`, {
    data: {
      productId,
    },
  });
  return res;
};

export const apiRegisterStaff = async (
  username: string,
  password: string,
  secretKey: string
) => {
  const res = await axios.post(`${BASE_URL}/api/register`, {
    username: username,
    password: password,
    secretKey: secretKey,
  });

  return res.data;
};
