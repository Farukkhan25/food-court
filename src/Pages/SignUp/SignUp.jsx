import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from "react-hook-form";
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const SignUp = () => {
    const {
      register,
      handleSubmit,
        watch,
      reset,
      formState: { errors },
    } = useForm();

    const { createUser, updateUserProfile } = useContext(AuthContext);

    // const [error, setError] = useState("");

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name)
                    .then(() => {
                        console.log('user profile info updated');
                        reset();
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "User created successfully!",
                      showConfirmButton: false,
                      timer: 1500,
                    }); 
                        Navigate('/');    
                    })
                .catch(error=>console.log(error))
        })
    };

    return (
        <>
            <Helmet>
                <title>Food Court | Sign Up</title>
            </Helmet>
      <div className="hero w-full my-20">
        <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <img
              className="w-3/4"
              src="https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4320.jpg?w=826&t=st=1666860644~exp=1666861244~hmac=6d992bd520b859c5a64d13102afca25b86fb8afa9423a6319aa8d1d8b9bec8e9"
              //   class="w-100 rounded-4 shadow-4"
              alt=""
            />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
            <h1 className="text-5xl text-center font-bold">Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true, maxLength: 20 })}
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered"
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-500">'Please enter your name'</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern:
                      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less then 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must include an uppercase, a lowercase, a character
                    and a number
                  </p>
                )}
              </div>
              
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Sign Up"
                />
              </div>
              {/* <div>{error && <p className="text-red-600">{error}</p>}</div> */}
            </form>
            <p className="text-center">
              Already have an account?{" "}
              <Link className="text-orange-600 font-bold" to="/login">
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
        </>
    );
};

export default SignUp;