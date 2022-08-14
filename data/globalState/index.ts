import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ICartItem, IUserAccount } from "../types";

const { persistAtom } = recoilPersist();

export const userAccountState = atom({
  key: "userAccountState",
  default: {
    userAccount: {
      id: "",
      username: "",
      rule: "",
    },
    isLoggedIn: false,
    error: "",
  } as IUserAccount,
  effects_UNSTABLE: [persistAtom],
});

export const cartListState = atom({
  key: "cartListState",
  default: [] as ICartItem[],
  effects_UNSTABLE: [persistAtom],
});

export const totalCartPriceState = atom({
  key: "totalCartPriceState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
