"use client"; // Client component to use Firebase Auth

import { useEffect, createContext, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebase";

// Create a UserContext
export const UserContext = createContext(null);

const AuthCheck = ({ children }) => {
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      } else {
        localStorage.removeItem("user");
        setUser(null);
        // router.push("/login"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthCheck;
