import { useParams } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const RouteAuth = () => {
  const { authOperation } = useParams();
  return (
    <div className="h-full">
      {authOperation === "login" || authOperation === "signup" ? (
        <AuthForm authOperation={authOperation} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default RouteAuth;
