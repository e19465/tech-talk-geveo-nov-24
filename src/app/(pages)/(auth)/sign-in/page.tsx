"use client";

import { ProgressLink } from "@/components/nprogress/NProgressHandler";
import { userLogin } from "@/actions/authActions";
import { useActionState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const SignInPage = () => {
  const router = useRouter();
  const [formState, formAction, isLoading] = useActionState(userLogin, {
    success: false,
    error: null,
    user: { id: "", email: "" },
  });

  if (formState?.error && !isLoading) {
    console.log(formState.error);
    toast.error(formState.error);
  }

  if (formState?.success && formState.user) {
    toast.success("Login successfully");
    localStorage.setItem("user_id", formState.user.id);
    localStorage.setItem("user_email", formState.user.email);
    setCookie("user_id", formState.user.id, {
      path: "/",
      maxAge: 100 * 365 * 24 * 60 * 60,
    });
    router.push("/");
  }

  // Handle form submission
  const handleAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formAction(formData);
  };

  return (
    <form
      className="flex flex-col shadow-md rounded-md items-center justify-center gap-4 p-4 w-[30%] border border-blue-400"
      onSubmit={handleAction}
    >
      <input
        type="email"
        placeholder="Email"
        name="login-email"
        id="login-email"
        required
        className="p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="password"
        placeholder="Password"
        name="login-password"
        id="login-password"
        required
        className="p-2 border border-gray-300 rounded w-full"
      />
      <button
        className="flex items-center justify-center px-4 py-2 border-none outline-none bg-blue-100 rounded-md"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Sign In"}
      </button>
      <div className="w-full flex items-center justify-center gap-4">
        <span>Don't have an account?</span>
        <ProgressLink href="/sign-up" className="text-blue-500">
          Sign up
        </ProgressLink>
      </div>
    </form>
  );
};

export default SignInPage;
