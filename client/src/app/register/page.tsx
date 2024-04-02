"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { register } from "../../actions/user";

const RegisterForm = () => {
  const [email, setEmail] = useState<HTMLInputElement | null>(null);
  const [username, setUsername] = useState<HTMLInputElement | null>(null);
  const [password, setPassword] = useState<HTMLInputElement | null>(null);
  const [confirm_password, setConfirmPassword] =
    useState<HTMLInputElement | null>(null);

  useEffect(() => {
    setEmail(document.querySelector('input[name="email"]') as HTMLInputElement);
    setUsername(
      document.querySelector('input[name="username"]') as HTMLInputElement
    );
    setPassword(
      document.querySelector('input[name="password"]') as HTMLInputElement
    );
    setConfirmPassword(
      document.querySelector(
        'input[name="confirm_password"]'
      ) as HTMLInputElement
    );
  }, []);

  const handleFormSubmission = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const form = document.getElementById("form") as HTMLFormElement;

    if (validateClientInput().error) return;

    const rval = await register(new FormData(form));

    if (rval && rval.error == "Email already in use") {
      email!.setCustomValidity("Email already in use");
      email!.reportValidity();
    }

    if (rval && rval.error == "Username already in use") {
      username!.setCustomValidity("Username already in use");
      username!.reportValidity();
    }
  };

  const validateClientInput = () => {
    email!.setCustomValidity("");
    username!.setCustomValidity("");
    password!.setCustomValidity("");
    confirm_password!.setCustomValidity("");

    if (!email!.checkValidity()) {
      email!.setCustomValidity(
        "Email has to be between 3-25 characters and have an @ symbol"
      );
      email!.reportValidity();
      return { error: "Invalid input" };
    }
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
    if (!confirm_password!.checkValidity()) {
      confirm_password!.setCustomValidity(
        "Password has to be between 5-20 characters and must match confirm password"
      );
      confirm_password!.reportValidity();
      return { error: "Invalid input" };
    }

    if (password!.value !== confirm_password!.value) {
      confirm_password!.setCustomValidity("Passwords Don't Match");
      confirm_password!.reportValidity();
      return { error: "Passwords don't match" };
    }

    return { success: true };
  };

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
              onChange={() => {
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
              onChange={() => {
                (
                  document.querySelector(
                    'input[name="confirm_password"]'
                  ) as HTMLFormElement
                ).setCustomValidity("");
              }}
            />

            <button
              type="submit"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handleFormSubmission(e);
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
