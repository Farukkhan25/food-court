import React from "react";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const GoogleLogin = () => {
  const { signInWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignin = () => {
    signInWithGoogle().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate(from, { replace: true });
      });
    });
  };

  return (
    <div className="px-8">
      <button
        onClick={handleGoogleSignin}
        aria-label="Log in with Google"
        className="px-2 py-[2px] my-3 bg-rose-100 text-3xl rounded-xl w-full"
      >
        <div className="flex items-center justify-center">
          <FcGoogle />{" "}
          <p className="text-[17px] pl-2 font-serif text-green-900 font-semibold">
            Continue with Google
          </p>
        </div>
      </button>
    </div>
  );
};

export default GoogleLogin;
