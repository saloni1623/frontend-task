// app/AuthCheck.js
"use client"; // This component is a client component

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebase";

const AuthCheck = ({ children }) => {
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to login if not authenticated
        router.push("/login");
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [auth, router]);

  return <>{children}</>; // Render children components
};

export default AuthCheck;
