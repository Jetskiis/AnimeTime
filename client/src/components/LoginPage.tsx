import axios from "axios";
import React from "react";
import { redirect } from "react-router-dom";
// import useLoggedInStatus from "../api/checkLogin";

const LoginForm = () => {
  const submitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const url = import.meta.env.VITE_BACKEND_URL + "/api/login";
    const username: HTMLInputElement | null = document.querySelector(
      'input[name="username"]'
    );
    const password: HTMLInputElement | null = document.querySelector(
      'input[name="password"]'
    );

    e.preventDefault();

    await axios
      .post(
        url,
        { username: username!.value, password: password!.value },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success) {
          redirect("/");
        }
      })
      .catch((err) => {
        console.log(err);
        if (
          err.response &&
          err.response.status == 400 &&
          err.response.data == "Username not found"
        ) {
          username!.setCustomValidity("Username not found");
          username!.reportValidity();
          return;
        }
        if (
          err.response &&
          err.response.status == 400 &&
          err.response.data == "Incorrect password"
        ) {
          password!.setCustomValidity("Incorrect password");
          password!.reportValidity();
          return;
        }
      });
  };

  // const {isLoggedIn, user} = useLoggedInStatus();
  const isLoggedIn = false;

  if (isLoggedIn) {
    return (
      <div className="fw-bold h-screen pt-32 text-center text-5xl">
        <h1>You are already logged in!</h1>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen flex-col bg-gray-100">
        <div className="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
          <div className="w-full rounded bg-white px-6 py-8 text-black shadow-md">
            <h1 className="mb-8 text-center text-3xl font-bold">Log In</h1>

            <input
              type="text"
              className="border-grey-light mb-4 block w-full rounded border p-3"
              name="username"
              placeholder="Username"
              minLength={3}
              maxLength={15}
              required
              onChange={() => {
                (document.querySelector(
                  'input[name="username"]'
                ) as HTMLInputElement)!.setCustomValidity("");
              }}
            />

            <input
              type="password"
              className="border-grey-light mb-4 block w-full rounded border p-3"
              name="password"
              placeholder="Password"
              minLength={5}
              maxLength={20}
              required
              onChange={(e) => {
                (document.querySelector(
                  'input[name="password"]'
                ) as HTMLInputElement)!.setCustomValidity("");
              }}
            />

            <button
              type="submit"
              formMethod="post"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                (document.querySelector(
                  'input[name="username"]'
                ) as HTMLInputElement)!.setCustomValidity("");
                (document.querySelector(
                  'input[name="password"]'
                ) as HTMLInputElement)!.setCustomValidity("");
                submitForm(e);
              }}
              className="hover:bg-green-dark mt-5 w-full rounded bg-red-500 py-3 text-center text-white hover:bg-red-600"
            >
              Login
            </button>

            <div className="text-black text-center mt-3">
              <a
                className="hover:opacity-80"
                href="/reset-password"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          <div className="text-grey-dark mt-6">
            Don't have an account?
            <a
              className="border-blue text-blue ml-1 border-b no-underline"
              href="/register"
            >
              Register now
            </a>
            .
          </div>
        </div>
      </div>
    );
  }
};

export default LoginForm;
