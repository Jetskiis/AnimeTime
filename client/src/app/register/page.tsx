"use client";

import axios from "axios";
import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { generateId } from "lucia";
import { PrismaClient } from "@prisma/client";

import lucia from "../../actions/auth";

interface ActionResult {
  error: string;
}

const prisma = new PrismaClient();

async function signup(_: any, formData: FormData): Promise<ActionResult> {
  "use server";
  const username = formData.get("username");
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  // TODO: check if username is already used
  await prisma.table("user").insert({
    id: userId,
    username: username,
    hashed_password: hashedPassword,
  });

  const session = await Lucia.createSession(userId, {});
  const sessionCookie = Lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}

const RegisterForm = () => {
  const submitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/register";
    const email: HTMLInputElement | null = document.querySelector(
      'input[name="email"]'
    );
    const username: HTMLInputElement | null = document.querySelector(
      'input[name="username"]'
    );
    const password: HTMLInputElement | null = document.querySelector(
      'input[name="password"]'
    );
    const confirm_password: HTMLInputElement | null = document.querySelector(
      'input[name="confirm_password"]'
    );
    if (
      !email!.checkValidity() ||
      !username!.checkValidity() ||
      !password!.checkValidity() ||
      !confirm_password!.checkValidity()
    ) {
      return;
    }
    if (password!.value !== confirm_password!.value) {
      confirm_password!.setCustomValidity("Passwords Don't Match");
      confirm_password!.reportValidity();
      return;
    }
    e.preventDefault();

    // await axios
    //   .post(
    //     url,
    //     {
    //       username: username!.value,
    //       password: password!.value,
    //       email: email!.value,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then(async (res) => {
    //     await axios.post(
    //       process.env.NEXT_PUBLIC_BACKEND_URL + "/api/login",
    //       {
    //         username: username!.value,
    //         password: password!.value,
    //       },
    //       { withCredentials: true }
    //     );
    //     redirect("/");
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //     if (err.response.status == 400) {
    //       if (err.response.data == "Email already exists") {
    //         email!.setCustomValidity("Email already exists");
    //         email!.reportValidity();
    //         return;
    //       }
    //       if (err.response.data == "Username already exists") {
    //         username!.setCustomValidity("Username already exists");
    //         username!.reportValidity();
    //         return;
    //       }
    //       if (err.response.data == "Invalid email") {
    //         email!.setCustomValidity("Invalid email");
    //         email!.reportValidity();
    //         return;
    //       }
    //     }
    //   });
  };

  //   const {isLoggedIn,user} = useLoggedInStatus();
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
          <form
            className="w-full rounded bg-white px-6 py-8 text-black shadow-md"
            id="form"
          >
            <h1 className="mb-8 text-center text-3xl font-bold">Sign up</h1>

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
                (
                  document.querySelector(
                    'input[name="username"]'
                  ) as HTMLFormElement
                ).setCustomValidity("");
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
                (
                  document.querySelector(
                    'input[name="password"]'
                  ) as HTMLFormElement
                ).setCustomValidity("");
              }}
            />
            <input
              type="password"
              className="border-grey-light mb-4 block w-full rounded border p-3"
              name="confirm_password"
              placeholder="Confirm Password"
              minLength={5}
              maxLength={20}
              required
              onChange={(e) => {
                (
                  document.querySelector(
                    'input[name="confirm_password"]'
                  ) as HTMLFormElement
                ).setCustomValidity("");
              }}
            />

            <button
              type="submit"
              formMethod="post"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                (
                  document.querySelector(
                    'input[name="confirm_password"]'
                  ) as HTMLInputElement
                ).setCustomValidity("");
                (
                  document.querySelector(
                    'input[name="username"]'
                  ) as HTMLInputElement
                ).setCustomValidity("");
                submitForm(e);
              }}
              className="hover:bg-green-dark w-full rounded bg-red-500 py-3 text-center text-white hover:bg-red-600"
            >
              Create Account
            </button>

            <div className="text-grey-dark mt-4 text-center text-sm">
              By signing up, you agree to the Terms of Service and Privacy
              Policy
            </div>
          </form>

          <div className="text-grey-dark mt-6">
            Already have an account?
            <Link
              className="border-blue text-blue ml-1 border-b no-underline"
              href="/login"
            >
              Log in
            </Link>
            .
          </div>
        </div>
      </div>
    );
  }
};

export default RegisterForm;
