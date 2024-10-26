import AuthForm from "./AuthForm";

const AuthPage = () => {
  return (
    <div className="bg-stone-200 p-6 flex flex-col h-full items-center justify-center space-y-2">
      <div>
        <div className="text-center font-bold text-xl p-2">Create an account</div>
        <div className="text-center text-xs text-neutral-400 p-2">
          Enter your email/username below to create your account
        </div>
      </div>
      <div>
        <AuthForm authOperation="signup" />
      </div>
      <div className="text-xs text-center text-neutral-400 flex justify-center items-center">
        <div className="p-2">
          <div className="w-12 border-b-[0.5px] border-black"></div>
          <div className="w-12"></div>
        </div>
        <div>OR CONTINUE WITH EMAIL</div>
        <div className="p-2">
          <div className="w-12 border-b-[0.5px] border-black"></div>
          <div className="w-12"></div>
        </div>
      </div>
      <div>
        <AuthForm authOperation="login" />
      </div>
    </div>
  );
};

export default AuthPage;
