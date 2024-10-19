import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // watch the password and confirm password fields
  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    // console.log(userInfo);
    await axios
      .post("/api/user/signup", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Signup successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-1 min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-indigo-950">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm py-2 px-4 border-2 border-indigo-500 rounded-md">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h1 className="text-2xl text-center text-white font-bold">
                Gap<span className="text-indigo-500 hover:text-indigo-300 hover:">Shap</span>
              </h1>
              <h2 className="mt-2 mb-2 text-center text-1xl font-bold leading-9 tracking-tight text-white">
                Sign Up
              </h2>
            </div>
              {/* user  */}
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Full name
                </label>
              </div>
              <div className="relative mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="top-3 left-3 w-4 h-4 opacity-70 absolute"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  placeholder="Full name"
                  {...register("fullname", {
                    required: true,
                  })}
                  className="grow focus:outline-none block w-full rounded-md border-0 mb-2 py-2 px-10 text-white bg-indigo-700 shadow-sm ring-1 ring-inset placeholder:text-indigo-300 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.fullname && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
              {/* email */}
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Email address
              </label>
              <div className="relative mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="pointer-events-none left-3 top-3 w-4 h-4 opacity-70 absolute"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  id="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  autoComplete="email"
                  className="grow focus:outline-none block w-full rounded-md border-0 mb-2 py-2 px-10 text-white bg-indigo-700 shadow-sm ring-1 ring-inset placeholder:text-indigo-300 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
              {/* password */}
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                Password
              </label>
              <div className="relative mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="pointer-events-none left-3 top-3 w-4 h-4 opacity-70 absolute"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  placeholder="Passsword"
                  {...register("password", {
                    required: true,
                    validate: validatePasswordMatch,
                  })}
                  autoComplete="current-password"
                  className="grow focus:outline-none block w-full rounded-md border-0 mb-2 py-2 px-10 text-white bg-indigo-700 shadow-sm ring-1 ring-inset placeholder:text-indigo-300 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
                {/* confirmPassword */}
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                    Confirm password
                  </label>
                </div>
                <div className="relative mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="pointer-events-none left-3 top-3 w-4 h-4 opacity-70 absolute"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    placeholder="Confirm passsword"
                    {...register("confirmPassword", {
                      required: true,
                      validate: validatePasswordMatch,
                    })}
                    autoComplete="current-password"
                    className="grow focus:outline-none block w-full rounded-md border-0 mb-2 py-2 px-10 text-white bg-indigo-700 shadow-sm ring-1 ring-inset placeholder:text-indigo-300 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
              {/* input ends  */}
              <div>
                <input
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-700 -mb-6 mt-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 hover:text-base duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 pb-2 cursor-pointer ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                  value="Sign Up"
                />
              </div>

            <p className="mt-10 text-center text-sm text-white">
              Have an Account?&nbsp;
              <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                Login Now!
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default Signup;
