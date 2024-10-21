import axios from "axios";
import type { User } from "../types/types";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	UserCredential,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export async function firebaseAuth(
	email: string,
	password: string,
	authOperation: "login" | "signup"
): Promise<User> {
	if (authOperation === "login") {
		const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
		const idToken: string = await userCredential.user.getIdToken();
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
		const userCredential: UserCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const idToken: string = await userCredential.user.getIdToken();
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
