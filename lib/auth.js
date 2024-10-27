import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { app, db } from "./firebase";
const auth = getAuth(app);
export const register =async (email, password) => {
  const userCredential=await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
console.log(user)
  // Update the user's display name in Firebase Authentication

  // Save the user's information in Firestore
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
  });
  return user;

};

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};