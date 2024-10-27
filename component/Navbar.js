"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase";

export default function Navbar() {
  const router = useRouter();
  const auth = getAuth(app);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-end">
        <button
          onClick={handleLogout}
           className="bg-red-700 hover:bg-red-800 text-black font-semibold py-2 px-4 rounded-lg transition"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
