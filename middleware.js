// middleware.js
import { NextResponse } from "next/server";
import { getAuth } from "firebase/auth";
import { app } from "./lib/firebase"; // Ensure firebase is initialized

export async function middleware(req) {
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
 
  // Check if the user is authenticated; if not, redirect to the login page.
  if (!currentUser && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Specify routes that require authentication
export const config = {
  matcher: ["/protected-page", "/another-protected-page"], // Add all paths requiring login here
};