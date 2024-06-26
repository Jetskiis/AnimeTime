"use client"

import axios from "axios";
import React, { useState } from "react";
import  Link from "next/link";

const ResetLogin = () => {
  const submitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const email: HTMLInputElement | null = document.querySelector(
      'input[name="email"]'
    );
    const username: HTMLInputElement | null = document.querySelector(
      'input[name="username"]'
    );

    e.preventDefault();

  };

  // const {isLoggedIn, user} = useLoggedInStatus();
  const [hasSentResetEmail, setHasSentResetEmail] = useState(false);
  const isLoggedIn = false;

  if (isLoggedIn) {
    return (
      <div className="fw-bold h-screen pt-32 text-center text-5xl">
        <h1>You are already logged in!</h1>
      </div>
    );
  } else if (hasSentResetEmail) {
    return (
      <div className="fw-bold h-screen pt-40 text-center text-5xl">
        <h1>Password reset email sent!</h1>
        <Link
          className="text-blue-700 underline underline-offset-8"
          href="/login"
        >
          Log back in.
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen flex-col bg-gray-100">
        <div className="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
          <div className="w-full rounded bg-white px-6 py-8 text-black shadow-md">
            <h1 className="mb-8 text-center text-3xl font-bold">
              Reset Password
            </h1>

            <input
              type="email"
              className="border-grey-light mb-4 block w-full rounded border p-3"
              name="email"
              placeholder="Email"
              minLength={3}
              maxLength={25}
              required
              onChange={() => {
                (
                  document.querySelector(
                    'input[name="email"]'
                  ) as HTMLFormElement
                ).setCustomValidity("");
              }}
            />
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

            <button
              type="submit"
              formMethod="post"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                (document.querySelector(
                  'input[name="username"]'
                ) as HTMLInputElement)!.setCustomValidity("");
                submitForm(e);
              }}
              className="hover:bg-green-dark mt-5 w-full rounded bg-red-500 py-3 text-center text-white hover:bg-red-600"
            >
              Reset Password
            </button>
            <span className="italic">
              feature not implemented yet, don't use it
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default ResetLogin;
