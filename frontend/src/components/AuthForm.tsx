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
    if (res.success) {
      console.log(`Login/Signup for email: ${res.email}`);
      setEmail("");
      setPassword("");
      navigate("/feed");
    }
  };

  return (
    <div className="p-6 flex h-full items-center justify-center">
      <form onSubmit={handleFirebaseAuth} className="flex flex-col space-y-2 min-w-96">
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          className="border-2 border-neutral p-2 rounded-lg border-[0.5px] border-neutral-300 bg-stone-200 outline-none text-sm"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="border-2 border-neutral p-2 rounded-lg border-[0.5px] border-neutral-300 bg-stone-200 outline-none text-sm"
        />
        <button
          onClick={handleFirebaseAuth}
          className="border-2 border-neutral bg-black text-neutral-200 text-sm p-2 rounded-lg"
        >
          {authOperation === "login" ? "Sign In" : "Sign Up"} with Email
        </button>
      </form>
    </div>
  );
};
export default AuthForm;
