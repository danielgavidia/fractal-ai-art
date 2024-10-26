import React, { useContext, useEffect, useState } from "react";
import { firebaseAuth } from "../firebase/firebaseUtils";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

interface AuthProps {
  authOperation: "login" | "signup";
}

const AuthForm = ({ authOperation }: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
    setUsername("");
    setError(false);
    setMessage("");
  }, [authOperation]);

  const handleFirebaseAuth = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const res = await firebaseAuth(email, password, authOperation, username);
    if (res.success) {
      console.log(`SUCCESS: Login/Signup for email: ${res.email}`);

      // Check that user has been created
      const context = useContext(AuthContext);
      if (context === undefined) {
        return;
      }
      const { loading } = context;
      const checkUserCreation = () =>
        new Promise<void>((resolve) => {
          const interval = setInterval(() => {
            if (!loading) {
              clearInterval(interval);
              resolve();
            }
          }, 100); // Check every 100ms
        });

      await checkUserCreation();

      navigate("/feed");
      setError(false);
      setMessage(res.message);
    } else {
      console.log(`FAILURE: Login/Signup for email: ${res.email}`);
      setEmail("");
      setPassword("");
      setUsername("");
      setError(true);
      setMessage(res.message);
    }
  };

  return (
    <div className="p-6 flex h-full items-center justify-center">
      <form onSubmit={handleFirebaseAuth} className="flex flex-col space-y-2 min-w-80">
        {authOperation === "signup" && (
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            className="border-2 border-neutral p-2 rounded-lg border-[0.5px] border-neutral-300 bg-stone-200 outline-none text-sm"
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          className="border-2 border-neutral p-2 rounded-lg border-[0.5px] border-neutral-300 bg-stone-200 outline-none text-sm"
        />
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="border-2 border-neutral p-2 rounded-lg border-[0.5px] border-neutral-300 bg-stone-200 outline-none text-sm"
        />
        <button
          onClick={handleFirebaseAuth}
          className="border-2 border-black bg-black text-neutral-200 text-sm p-2 rounded-lg"
        >
          {authOperation === "login" ? "Sign In" : "Sign Up"} with Email
        </button>
        {error ? (
          <p className="text-red-500 text-sm text-center">{message}</p>
        ) : (
          <p className="text-green">{message}</p>
        )}
      </form>
    </div>
  );
};
export default AuthForm;
