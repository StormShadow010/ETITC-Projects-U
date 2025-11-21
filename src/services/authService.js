import { auth, googleProvider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user; // contiene displayName, email, photoURL
  } catch (error) {
    console.error("Error login:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logout:", error);
  }
};
