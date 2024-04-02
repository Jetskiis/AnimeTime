//registration, login, reset
"use server";
import { PrismaClient } from "@prisma/client";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import lucia from "../actions/auth";

const prisma = new PrismaClient();

interface ActionResult {
  error?: string;
  success?: boolean;
}

export const register = async (form: FormData): Promise<ActionResult> => {
  let email: FormDataEntryValue | null = form.get("email");
  let username: FormDataEntryValue | null = form.get("username");
  let password: FormDataEntryValue | null = form.get("password");

  const hashedPassword = await new Argon2id().hash(password as string);
  const userId = generateId(15);

  ///check if username/email is already used
  const checkEmail = await prisma.user.findFirst({
    where: {
      email: email as string,
    },
  });

  const checkUsername = await prisma.user.findFirst({
    where: {
      username: username as string,
    },
  });

  if (checkEmail) {
    return { error: "Email already in use" };
  }

  if (checkUsername) {
    return { error: "Username already in use" };
  }

  try {
    const User = await prisma.user.create({
      data: {
        id: userId,
        email: email as string,
        username: username as string,
        hashed_password: hashedPassword,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error: any) {
    return { error: error?.message || "An error occurred" };
  }

  return redirect("/");
};

export const login = async (form: FormData): Promise<ActionResult> => {
  // let username: FormDataEntryValue | null = form.get("username");
  // let password: FormDataEntryValue | null = form.get("password");

  // const checkUsername = await prisma.user.findFirst({
  //   where: {
  //     username: username as string,
  //   },
  // });

  // if (!checkUsername) {
  //   username!.setCustomValidity("Username not found");
  //   username!.reportValidity();
  //   return { error: "Username not found" };
  // }

  // const validPassword = await new Argon2id().verify(
  //   checkUsername.hashed_password,
  //   password?.value || ""
  // );
  // if (!validPassword) {
  //   return {
  //     error: "Incorrect password",
  //   };
  // }

  // const session = await lucia.createSession(existingUser.id, {});
  // const sessionCookie = lucia.createSessionCookie(session.id);
  // cookies().set(
  //   sessionCookie.name,
  //   sessionCookie.value,
  //   sessionCookie.attributes
  // );
  return redirect("/");
};
