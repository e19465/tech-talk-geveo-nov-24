"use client";

import { ProgressLink } from "@/components/nprogress/NProgressHandler";
import { userRegister } from "@/actions/authActions";
import { useActionState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
  const [formState, formAction, isLoading] = useActionState(userRegister, {
    success: false,
    error: null,
  });

  if (formState?.error && !isLoading) {
    console.log(formState.error);
    toast.error(formState.error);
  }

  if (formState?.success) {
    toast.success("User registered successfully");
    router.push("/sign-in");
  }

  // Handle form submission
  const handleAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formAction(formData);
  };

  return (
    <form
      className="flex flex-col shadow-md rounded-md items-center justify-center gap-8 p-4 w-[30%] border border-blue-400"
      onSubmit={handleAction}
    >
      <input
        type="email"
        name="reg-email"
        id="reg-email"
        placeholder="Email"
        required
        className="p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="password"
        placeholder="Password"
        id="reg-password"
        name="reg-password"
        required
        className="p-2 border border-gray-300 rounded w-full"
      />
      <button
        className="flex items-center justify-center px-4 py-2 border-none outline-none bg-blue-100 rounded-md"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? "Loading..." : "Sign Up"}
      </button>
      <div className="w-full flex items-center justify-center gap-4">
        <span>Already have an account?</span>
        <ProgressLink href="/sign-in" className="text-blue-500">
          Sign In
        </ProgressLink>
      </div>
    </form>
  );
};

export default SignUpPage;
