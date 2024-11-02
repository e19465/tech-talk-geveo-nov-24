"use server";
import { prisma } from "@/lib/client";

export const userRegister = async (
  prevState: { success: boolean; error: string | null },
  formData: FormData
) => {
  try {
    const email = formData.get("reg-email") as string;
    const password = formData.get("reg-password") as string;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return { success: false, error: "Email already exists" };
    }
    await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: "Something went wrong. Please try again" };
  }
};

export const userLogin = async (
  prevState: { success: boolean; error: string | null; user: any },
  formData: FormData
) => {
  try {
    const email = formData.get("login-email") as string;
    const password = formData.get("login-password") as string;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return { success: false, error: "Wrong credentials!", user: null };
    }

    if (user.password !== password) {
      return { success: false, error: "Wrong credentials!", user: null };
    }

    return {
      success: true,
      error: null,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  } catch (err: any) {
    return {
      success: false,
      error: "Something went wrong. Please try again",
      user: null,
    };
  }
};
