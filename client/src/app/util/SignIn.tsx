"use client"
import React, { useEffect, useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "@/app/store/reducers/userSlice";
import { User } from "@/app/interfaces/types";
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const allUsers = useSelector((state: any) => state.users.users);
  const dispatch = useDispatch();
  const router = useRouter();
  const [account, setAccount] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const user = allUsers.find((user: User) => {
      console.log(user);
      
      const decryptedPassword = CryptoJS.DES.decrypt(
        user.password,
        "secret_key"
      ).toString(CryptoJS.enc.Utf8);
      
      return user.userName === account && decryptedPassword === password;
    });

    if (user) {
      localStorage.setItem("currentUserId", JSON.stringify(user.id));
      router.push("/home");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex h-[690px] w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[url('https://firebasestorage.googleapis.com/v0/b/e-commerce-60acc.appspot.com/o/img%2F2.jpg?alt=media&token=5fffaaee-c5ce-4edf-944d-0fd63814496f')]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm"> 
      
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="account"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tên tài khoản
            </label>
            <div className="mt-2">
              <input
                id="account"
                name="account"
                type="text"
                required
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                autoComplete="account"
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className=" block text-sm font-medium leading-6 text-gray-900"
              >
                Mật khẩu
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Bạn chưa có tài khoản?{" "}
          <button
          onClick={()=>router.push("/register")}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Hãy đăng kí tài khoản tại đây
          </button>
        </p>
      </div>
    </div>
  );
}
