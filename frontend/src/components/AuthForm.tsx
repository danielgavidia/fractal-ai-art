import React, { useState } from "react";
import { firebaseAuth } from "../firebase/firebaseUtils";
import { useNavigate } from "react-router-dom";

interface AuthProps {
	authOperation: "login" | "signup";
}

const AuthForm = ({ authOperation }: AuthProps) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleFirebaseAuth = async (e: React.FormEvent): Promise<void> => {
		e.preventDefault();
		const res = await firebaseAuth(email, password, authOperation);
		console.log(`Login/Signup for email: ${res.email}`);
		setEmail("");
		setPassword("");
		navigate("/feed");
	};

	return (
		<div>
			<form onSubmit={handleFirebaseAuth}>
				<input
					onChange={(e) => setEmail(e.target.value)}
					placeholder="email"
					className="border-2 border-neutral"
				/>
				<input
					onChange={(e) => setPassword(e.target.value)}
					placeholder="password"
					className="border-2 border-neutral"
				/>
				<button onClick={handleFirebaseAuth} className="border-2 border-neutral">
					{authOperation === "login" ? "Login" : "Signup"}
				</button>
			</form>
		</div>
	);
};
export default AuthForm;
