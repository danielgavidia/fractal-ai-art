import axios from "axios";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

type AuthRes = {
  email: string;
  success: boolean;
  message: string;
};

export async function firebaseAuth(
  email: string,
  password: string,
  authOperation: "login" | "signup",
  username?: string
): Promise<AuthRes> {
  const authInstance = getAuth();

  try {
    if (authOperation === "login") {
      await signInWithEmailAndPassword(auth, email, password);
      const idToken = await authInstance.currentUser?.getIdToken();

      const prismaRes = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!prismaRes) {
        return { email: email, success: false, message: "User does not exist" };
      }
      return { email: email, success: true, message: "Login successful" };
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await authInstance.currentUser?.getIdToken();

      const prismaRes = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        data: {
          username: username,
        },
      });

      if (!prismaRes) {
        return { email: email, success: false, message: "Prisma error: user already exists" };
      }
      return { email: email, success: true, message: "Signup successful" };
    }
  } catch (error) {
    await auth.signOut();
    console.log(error);
    return { email, success: false, message: "Authentication error" };
  }
}
