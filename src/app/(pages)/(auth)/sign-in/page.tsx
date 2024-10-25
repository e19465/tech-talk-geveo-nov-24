import { ProgressLink } from "@/components/nprogress/NProgressHandler";
import React from "react";

const SignInPage = () => {
  return (
    <form className="flex flex-col shadow-md rounded-md items-center justify-center gap-4 p-4 w-[30%] border border-blue-400">
      <input
        type="email"
        placeholder="Email"
        required
        className="p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="password"
        placeholder="Password"
        required
        className="p-2 border border-gray-300 rounded w-full"
      />
      <button className="flex items-center justify-center px-4 py-2 border-none outline-none bg-blue-100 rounded-md">
        Sign In
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
