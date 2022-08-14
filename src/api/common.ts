import axios from "axios";

export const BASE_URL = "https://localhost:8000";

export const apiLogin = async (username: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const apiUpdateAccount = async (
  username: string,
  type: string,
  context: string
) => {
  const getParams = () => {
    switch (type) {
      case "rule":
        return {
          rule: context,
        };
      case "status":
        return {
          status: context,
        };
      default:
        return {
          password: context,
        };
    }
  };
  const res = await axios.patch(`${BASE_URL}/api/update-account`, {
    username: username,
    ...getParams(),
  });

  return res;
};

export const apiRegister = async (username: string, password: string) => {
  const res = await axios.post(`${BASE_URL}/api/register`, {
    username: username,
    password: password,
  });

  return res.data;
};

export const apiProductList = async (page: string) => {
  const res = await axios.post(`${BASE_URL}/api/product/list`, {
    category: page,
  });
  return await res.data;
};

export const apiProductDetail = async (id: number) => {
  const res = await axios.post(`${BASE_URL}/api/get-product`, {
    productId: id,
  });
  return await res.data;
};
