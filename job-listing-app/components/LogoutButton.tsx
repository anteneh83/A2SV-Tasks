"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="px-4 py-2 text-sm text-red-600 hover:text-red-800"
    >
      Logout
    </button>
  );
}
