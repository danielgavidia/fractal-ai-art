import axios from "axios";
import type { User } from "../types/types";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export async function firebaseAuth(
	email: string,
	password: string,
	authOperation: "login" | "signup"
): Promise<User> {
	const authInstance = getAuth();
	let idToken: string | undefined;

	if (authOperation === "login") {
		await signInWithEmailAndPassword(auth, email, password);
		idToken = await authInstance.currentUser?.getIdToken();
		const res = await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_URL}/user/login`,
			headers: {
				Authorization: `Bearer ${idToken}`,
			},
		});
		const data: User = res.data;
		return data;
	} else {
		await createUserWithEmailAndPassword(auth, email, password);
		idToken = await authInstance.currentUser?.getIdToken();
		const res = await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
			headers: {
				Authorization: `Bearer ${idToken}`,
			},
		});
		const data: User = res.data;
		return data;
	}
}
