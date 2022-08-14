import axios from "axios";
import { IProductOrder } from "../../data/types";
import { BASE_URL } from "./common";

export const apiOrder = async (
  products: IProductOrder[],
  userAccount: string
) => {
  const res = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      products,
      userAccount,
    }),
  });
  return await res.json();
};

export const apiRegisterInfo = async (
  userId: string,
  name: string,
  email: string,
  phone: string,
  address: string,
  dayOfBirth: string
) => {
  const res = await axios.post(`${BASE_URL}/api/register/info`, {
    userId: userId,
    name: name,
    email: email,
    phone: phone,
    address: address,
    dayOfBirth: dayOfBirth,
  });

  return res.data;
};

export const apiUserInfo = async (userId: string) => {
  const res = await axios.post(`${BASE_URL}/api/user/info`, {
    userId: userId,
  });

  return res.data;
};

export const apiAddOrder = async (
  userInfoId: number,
  payment: string,
  status: string
) => {
  const res = await axios.post(`${BASE_URL}/api/order`, {
    userInfoId: userInfoId,
    payment: payment,
    status: status,
  });

  return res.data;
};

export const apiAddOrderDetail = async (
  orderId: number,
  productId: number,
  amount: number
) => {
  const res = await axios.post(`${BASE_URL}/api/order-detail`, {
    orderId: orderId,
    productId: productId,
    amount: amount,
  });

  return res.data;
};

export const apiGetUserOrder = async (userId: number) => {
  const res = await axios.post(`${BASE_URL}/api/user/order`, {
    userId: userId,
  });

  return res.data;
};

export const apiGetOrderDetail = async (orderId: number) => {
  const res = await axios.post(`${BASE_URL}/api/order/detail`, {
    orderId: orderId,
  });

  return res.data;
};
