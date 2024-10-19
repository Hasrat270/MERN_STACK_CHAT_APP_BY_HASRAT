import axios from "axios";
// This fucking react hook is not working 
import { useAuth } from "../context/AuthProvider";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    // console.log(userInfo);
    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successful");
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
              <h2 className="mt-5 mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                Sign In
              </h2>
            </div>
            {/* email */}
              <div>
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
                  <span className="text-red-500 text-sm font-semibold">
                    This field is required
                  </span>
                )}
              </div>
              {/* password */}
              
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                    Password
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
                    placeholder="Passsword"
                    {...register("password", { required: true })}
                    autoComplete="current-password"
                    className="grow focus:outline-none block w-full rounded-md border-0 mb-2 py-2 px-10 text-white bg-indigo-700 shadow-sm ring-1 ring-inset placeholder:text-indigo-300 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm font-semibold">
                    This field is required
                  </span>
                )}
              
              {/* input ends  */}
                <input
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-700 mt-6 -mb-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 hover:text-base duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 pb-2 cursor-pointer ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                  value="Sign In"
                />

            <p className="mt-10 text-center text-sm text-white">
              Not a member?&nbsp;
              <Link to="/signup" className="font-semibold text-indigo-400 hover:text-indigo-300">
                Signup now!
              </Link>
            </p>
          </div>
        </div>
      </form>

    </>
  );
}

export default Login;
