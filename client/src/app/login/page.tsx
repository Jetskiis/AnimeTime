"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { login } from "../../actions/user";
import {type User} from "lucia";
import getUser from "../../hooks/useSessionStatus";


const LoginForm = () => {
  const [username, setUsername] = useState<HTMLInputElement | null>(null);
  const [password, setPassword] = useState<HTMLInputElement | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUsername(
      document.querySelector('input[name="username"]') as HTMLInputElement
    );
    setPassword(
      document.querySelector('input[name="password"]') as HTMLInputElement
    );
    (async () =>{
      const user = await getUser();
      setUser(user);
    })()
  }, []);

  const handleFormSubmission = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const form = document.getElementById("form") as HTMLFormElement;

    if (validateClientInput().error) return;

    const rval = await login(new FormData(form));

    if(rval && rval.error == "Username not found") {
      username!.setCustomValidity("Invalid username");
      username!.reportValidity();
    }

    if(rval && rval.error == "Incorrect password") {
      password!.setCustomValidity("Incorrect password");
      password!.reportValidity();
    }
  };

  const validateClientInput = () => {
    username!.setCustomValidity("");
    password!.setCustomValidity("");

    if (!username!.checkValidity()) {
      username!.setCustomValidity("Username has to be between 3-15 characters");
      username!.reportValidity();
      return { error: "Invalid input" };
    }
    if (!password!.checkValidity()) {
      password!.setCustomValidity(
        "Password has to be between 5-20 characters and must match confirm password"
      );
      password!.reportValidity();
      return { error: "Invalid input" };
    }

    return { success: true };
  };


  if (user) {
    return (
      <div className="fw-bold h-screen pt-32 text-center text-5xl">
        <h1>You are already logged in!</h1>
        <Link href="/" className="underline text-blue-500">Go Home</Link>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen flex-col bg-gray-100">
        <form className="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2" id="form">
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
        </form>
      </div>
    );
  }
};

export default LoginForm;
