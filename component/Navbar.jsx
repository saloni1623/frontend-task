"use client";

import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useState,useLayoutEffect}from 'react'
export default function Navbar() {
  const router = useRouter();
  const auth = getAuth(app);
const [userdata,setuserdata]=useState(null)
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login"); // Redirect to login page after logout
  };
  const handleLogin = () => {
    router.push("/login"); // Redirect to login page after logout
  };
  
useLayoutEffect(() => {
  const getUser = () =>{  
    if(auth.currentUser){
      setuserdata(auth.currentUser)
    }else{
      setuserdata(null)
    }

  }

  return () => {
    getUser()
  };
}, [auth])
console.log(userdata)

  const isLoggedIn = Boolean(userdata);
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl  flex items-center justify-between">
      <div className="flex items-center justify-between">
        {userdata ? <button className="bg-red-700 hover:bg-red-800 text-red font-semibold py-2 px-4 rounded-lg transition" onClick={handleLogout}>
         Signout
        </button>:<button className="bg-red-700 hover:bg-red-800 text-red font-semibold py-2 px-4 rounded-lg transition" onClick={handleLogin}>
         Login
        </button>}
        
      </div>
      
      </div>
    </nav>
  );
}
