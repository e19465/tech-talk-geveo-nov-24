"use client";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      deleteCookie("user_id");
      router.push("/login");
    }
  };

  return (
    <button
      className="rounded-md px-3 py-2 text-sm font-medium bg-blue-900 text-white"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
