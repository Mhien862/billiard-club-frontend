import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { userAccountState } from "../data/globalState";
import PageLayout from "../src/components/common/PageLayout";

const Logout = () => {
  const resetUser = useResetRecoilState(userAccountState);
  const router = useRouter();

  useEffect(() => {
    resetUser();
    router.push("/");
  });

  return <PageLayout></PageLayout>;
};

export default Logout;
