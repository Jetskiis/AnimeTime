import axios from "axios";
import React from "react";
import { redirect } from "react-router-dom";
// import useLoggedInStatus from "../api/checkLogin";

const RegisterForm = () => {
  const submitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/register";
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

    await axios
      .post(url, {
        username: username!.value,
        password: password!.value,
        email: email!.value,
      })
      .then(async () => {
        await axios.post(
          //   process.env.NEXT_PUBLIC_BACKEND_URL + "/api/login",
          {
            username: username!.value,
            password: password!.value,
            email: email!.value,
          },
          { withCredentials: true }
        );
        redirect("/");
      })
      .catch((err) => {
        if (err.response.status == 400) {
          if (err.response.data == "Email already exists") {
            email!.setCustomValidity("Email already exists");
            email!.reportValidity();
            return;
          }
          if (err.response.data == "Username already exists") {
            username!.setCustomValidity("Username already exists");
            username!.reportValidity();
            return;
          }
        }
      });
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
            <a
              className="border-blue text-blue ml-1 border-b no-underline"
              href="/login"
            >
              Log in
            </a>
            .
          </div>
        </div>
      </div>
    );
  }
};

export default RegisterForm;
