import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useSignup } from "../components/features/auth/queries/useSignup";
import { useLogin } from "../components/features/auth/queries/useLogin";

export function AuthLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const { loginFn, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.email = data.email.toLowerCase();
    loginFn(data);
  };

  return (
    <div className="w-full h-screen space-y-4">
      <div
        className="h-[55vh] w-full max-w-[620px] mx-auto bg-fill bg-no-repeat bg-top relative"
        style={{ backgroundImage: "url(/bg-login.png)" }}
      >
        <div className="before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-[#131313]"></div>
        <div className="w-full h-full flex flex-col gap-6 items-center justify-center relative z-10">
          <img src="session_logo.svg" alt="" />
          <div className="flex flex-col gap-2 w-full items-center">
            <p>Welcome to</p>
            <h1 className="font-bold text-3xl">Sessions</h1>
            <p className="text-center text-white/50 text-xs max-w-[320px]">
              Step into the future of video streaming Onchain. Connect with
              creators, mint exclusive videos, and explore content in an
              entirely new way.
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-8 w-full max-w-lg mx-auto mt-4 px-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-left"
        >
          <div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter email address"
              className="w-full bg-white/10 py-4 px-6 rounded-lg placeholder:text-white/50"
              {...register("email", { required: true })}
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name=""
              id=""
              placeholder="Enter password"
              className="w-full bg-white/10 py-4 px-6 rounded-lg placeholder:text-white/50"
              {...register("password", {
                required: true,
                pattern: {
                  value: /^.{7,}$/,
                  message: "Password must be up to 7 characters long",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500">
                Password should be more that 7 characters
              </span>
            )}
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
              {showPassword ? (
                <div onClick={() => setShowPassword(!showPassword)}>
                  <BsEyeFill />
                </div>
              ) : (
                <div onClick={() => setShowPassword(!showPassword)}>
                  <BsEyeSlashFill />
                </div>
              )}
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <Link to="/select">
              <div className="text-sm text-white/40 hover:text-white cursor-pointer w-fit">
                <p>
                  New User?{" "}
                  <span className="text-[#0052FE] ">Create Account</span>
                </p>
              </div>
            </Link>
            <div className="text-sm text-white/40 hover:text-white cursor-pointer ">
              <p>Forgotten password?</p>
            </div>
          </div>
        </form>
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={handleSubmit(onSubmit)}
            className="bg-[#0052FE] hover:bg-[#0052FE]/80 w-full rounded-2xl px-6 py-4"
          >
            {isPending ? "Loading..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AuthSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation(); // Use useLocation to get the current location object
  const queryParams = new URLSearchParams(location.search); // Parse the search string
  const accountType = queryParams.get("accountType"); // Get the 'accountType' query parameter

  const { signupFn, isPending } = useSignup();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.email = data.email.toLowerCase();
    signupFn({ ...data, type: accountType });
  };

  return (
    <div className="w-full h-screen space-y-4">
      <div
        className="h-[55vh] w-full max-w-[620px] mx-auto bg-fill bg-no-repeat bg-top relative"
        style={{ backgroundImage: "url(/bg-login.png)" }}
      >
        <div className="before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-[#131313]"></div>
        <div className="w-full h-full flex flex-col gap-6 items-center justify-center relative z-10">
          <img src="session_logo.svg" alt="" />
          <div className="flex flex-col gap-2 w-full items-center">
            <p>Welcome to</p>
            <h1 className="font-bold text-3xl">Sessions</h1>
            <p className="text-center text-white/50 text-xs max-w-[320px]">
              Step into the future of video streaming Onchain. Connect with
              creators, mint exclusive videos, and explore content in an
              entirely new way.
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-8 w-full max-w-lg mx-auto mt-4 px-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-left"
        >
          <div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter email address"
              className="w-full bg-white/10 py-4 px-6 rounded-lg placeholder:text-white/50"
              {...register("email", { required: true })}
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name=""
              id=""
              placeholder="Enter password"
              className="w-full bg-white/10 py-4 px-6 rounded-lg placeholder:text-white/50"
              {...register("password", {
                required: true,
                pattern: {
                  value: /^.{7,}$/,
                  message: "Password must be up to 7 characters long",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500">
                Password should be more that 7 characters
              </span>
            )}
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
              {showPassword ? (
                <div onClick={() => setShowPassword(!showPassword)}>
                  <BsEyeFill />
                </div>
              ) : (
                <div onClick={() => setShowPassword(!showPassword)}>
                  <BsEyeSlashFill />
                </div>
              )}
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <Link to="/login">
              <div className="text-sm text-white/40 hover:text-white cursor-pointer w-fit">
                <p>
                  Have an account?{" "}
                  <span className="text-[#0052FE] ">Login</span>
                </p>
              </div>
            </Link>
            <div className="text-sm text-white/40 hover:text-white cursor-pointer ">
              <p>Forgotten password?</p>
            </div>
          </div>
        </form>
        <div className="flex flex-col gap-3 w-full">
          <button
            type="submit"
            className="bg-[#0052FE] hover:bg-[#0052FE]/80 w-full rounded-2xl px-6 py-4"
            onClick={handleSubmit(onSubmit)}
          >
            {isPending ? "Loading..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
