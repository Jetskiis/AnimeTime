"use client";

import Link from "next/link";
import React from "react";
import { login } from "../../actions/user";

const handleFormSubmission = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  const form = document.getElementById("form") as HTMLFormElement;

  if (validateClientInput().error) return;

  const rval = await login(new FormData(form));
};

const validateClientInput = () => {
  const username = document.querySelector(
    'input[name="username"]'
  ) as HTMLInputElement;
  const password = document.querySelector(
    'input[name="password"]'
  ) as HTMLInputElement;

  username!.setCustomValidity("");
  password!.setCustomValidity("");

  if (
    !username.checkValidity() ||
    !password.checkValidity()
  ) {
    return { error: "Invalid input" };
  }
  return { success: true };
};

const LoginForm = () => {
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
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handleFormSubmission(e);
              }}
              className="hover:bg-green-dark mt-5 w-full rounded bg-red-500 py-3 text-center text-white hover:bg-red-600"
            >
              Login
            </button>

            <div className="mt-3 text-center text-black">
              <Link className="hover:opacity-80" href="/reset-password">
                Forgot Password?
              </Link>
            </div>
          </div>

          <div className="text-grey-dark mt-6">
            Don't have an account?
            <Link
              className="border-blue text-blue ml-1 border-b no-underline"
              href="/register"
            >
              Register now
            </Link>
            .
          </div>
        </div>
      </div>
    );
  }
};

export default LoginForm;
