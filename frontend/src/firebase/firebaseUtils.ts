import axios from "axios";
import type { User } from "../types/types";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

type AuthRes = {
  success: boolean;
  email: string;
};

export async function firebaseAuth(
  email: string,
  password: string,
  authOperation: "login" | "signup",
  username?: string
): Promise<AuthRes> {
  const authInstance = getAuth();
  let idToken: string | undefined;

  if (authOperation === "login") {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      idToken = await authInstance.currentUser?.getIdToken();
      const res = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      const data: User = res.data.user;
      console.log(data);
      return { success: true, email: email };
    } catch (e) {
      console.log(e);
      return { success: false, email: email };
    }
  } else {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      idToken = await authInstance.currentUser?.getIdToken();
      const res = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        data: {
          username: username,
        },
      });
      const data: User = res.data.user;
      console.log(data);
      return { success: true, email: email };
    } catch (e) {
      console.log(e);
      return { success: false, email: email };
    }
  }
}
