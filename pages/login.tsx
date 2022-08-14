import type { NextPage } from "next";
import { useState } from "react";
import { apiLogin } from "../src/api/common";
import Button from "../src/components/common/Button";
import Input from "../src/components/common/Input";
import PageLayout from "../src/components/common/PageLayout";
import bcrypt from "bcryptjs";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAccountState } from "../data/globalState";

const Login: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const setUser = useSetRecoilState(userAccountState);

  const checkError = () => {
    setUsernameError("");
    setPasswordError("");
    if (username === "") {
      setUsernameError("Username is required");
      return false;
    }
    if (password === "") {
      setPasswordError("Password is required");
      return false;
    }

    // const reg =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (!reg.test(password)) {
    //   setPasswordError(
    //     "Password must be at least 8 characters, contain at least one lowercase letter, one uppercase letter, one number and one special character"
    //   );
    //   return false;
    // }

    return true;
  };
  const handleLogin = async () => {
    if (!checkError()) return;
    const res = await apiLogin(username, password);

    if (res.error) {
      setUsernameError(res.error);
    }

    if (res.password) {
      if (bcrypt.compareSync(password, res.password)) {
        toast("Login success", {
          type: "success",
        });
        setUsernameError("");
        setPasswordError("");

        setUser({
          userAccount: {
            id: res.userId,
            username: res.username,
            rule: res.rule,
          },
          isLoggedIn: true,
          error: "",
        });
        router.push("/");
      } else {
        setPasswordError("Wrong password");
      }
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="bg-white w-full lg:w-1/2 p-6 my-10 rounded-lg drop-shadow-xl">
          <h1 className="text-2xl font-semibold mb-10 text-center">Login</h1>
          <div className="flex flex-col items-center justify-center space-y-5">
            <Input
              type="text"
              placeholder="Username"
              label="User name"
              required
              error={usernameError}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Username"
              error={passwordError}
              required={true}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="w-full flex flex-row justify-between items-center">
              <Link href="/forgot-password">
                <a>Forgot password?</a>
              </Link>
              <Link href="/register">
                <a>Register</a>
              </Link>
            </div>
            <div className="flex justify-center">
              <Button onClick={handleLogin}>Login</Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
