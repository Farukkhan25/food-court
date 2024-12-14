import { useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import GoogleLogin from "../../components/SocialLogin/googleLogin";

const Login = () => {
      const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm({
          defaultValues: {
              email: "",
              password: "",
          }
      });
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // console.log('state in the location login page', location.state);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

    const handleLogin = (event) => {
        setError("");
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1500,
                })
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
            });
    }
  

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    // console.log(value);
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
        setDisabled(true);
      alert("Captcha Does Not Match");
    }
  };

  return (
    <>
      <Helmet>
        <title>Food Court | Login</title>
      </Helmet>
      <div className="hero w-full my-20">
        <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <img
              className="w-3/4"
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              alt=""
            />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
            <h1 className="text-5xl text-center font-bold">Login</h1>
            <form
              //   onSubmit={handleSubmit(handleLogin)}
              onSubmit={handleLogin}
              className="card-body"
            >
              <div className="form-control">
                <label className="label">
                  {" "}
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  {" "}
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  name="password"
                  placeholder="password"
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password?.message}</p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  onBlur={handleValidateCaptcha}
                  type="text"
                  name="captcha"
                  placeholder="Type the captcha above"
                  className="input input-bordered w-full max-w-xs"
                />
               
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn btn-primary font-bold"
                  type="submit"
                  value="Login"
                  disabled={false}
                />
              </div>
              <div>
                {error && (
                  <p className="text-red-600">
                    'Email/Password does not match'
                  </p>
                )}
              </div>
            </form>
            <div className="space-y-1 px-8">
              <button
                // onClick={handleReset}
                className="text-xs hover:underline text-gray-400"
              >
                Forgot password?
              </button>
            </div>
            <div className="flex items-center pt-4 space-x-1">
              <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
              <p className="px-3 text-sm dark:text-gray-400">
                Login with social account
              </p>
              <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            </div>
            <div>
              <GoogleLogin></GoogleLogin>
            </div>
            <p className="text-center">
              Don't have an account?{" "}
              <Link className="text-orange-600 font-bold" to="/signup">
                Register
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

    export default Login;
