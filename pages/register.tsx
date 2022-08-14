import type { NextPage } from "next";
import { useState } from "react";
import { apiLogin, apiRegister } from "../src/api/common";
import Button from "../src/components/common/Button";
import Input from "../src/components/common/Input";
import PageLayout from "../src/components/common/PageLayout";
import bcrypt from "bcryptjs";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";

const Register: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const router = useRouter();

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
    if (confirmPassword === "") {
      setConfirmPasswordError("Confirm password is required");
      return false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Password and confirm password must be same");
      return false;
    }
    const reg =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!reg.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters, contain at least one lowercase letter, one uppercase letter, one number and one special character(@$!%*?&#)"
      );
      return false;
    }

    return true;
  };
  const handleClick = async () => {
    if (!checkError()) return;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    const res = await apiRegister(username, hash);

    if (res.error) {
      setUsernameError(res.error);
    }

    if (res.userId) {
      toast.success("Register success");
      router.push("/login");
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="bg-white w-full lg:w-1/2 p-6 my-10 rounded-lg drop-shadow-xl">
          <h2 className="text-2xl font-semibold mb-10 text-center">Register</h2>
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
              type={isShowPassword ? "text" : "password"}
              label="Password"
              placeholder="Password"
              error={passwordError}
              required={true}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Input
              type={isShowPassword ? "text" : "password"}
              label="Confirm Password"
              placeholder="Confirm Password"
              error={confirmPasswordError}
              required={true}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <div className="w-full flex justify-end">
              <button
                className="text-gray-500 underline"
                onClick={() => {
                  setIsShowPassword(!isShowPassword);
                  setTimeout(() => {
                    setIsShowPassword(false);
                  }, 2000);
                }}
              >
                Show password
              </button>
            </div>
            <span>
              Not a customer?{" "}
              <Link href="/register-staff">
                <a className="text-blue-500">Register for staff</a>
              </Link>
            </span>
            <div className="flex justify-center">
              <Button onClick={handleClick}>Register</Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Register;
