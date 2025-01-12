import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [hide, setHide] = useState(true);

  const onSubmit = async (data) => {
    const res = await login(data);
    if (res?.error) {
      toast.error(`${res?.error?.data?.errorMessage}`, {
        duration: 3000,
        removeDelay: 1000,
      });
    } else {
      toast.success(`${res?.data?.message}`, {
        duration: 3000,
      });
      const decode = jwtDecode(res.data.data.token);

      localStorage.setItem("token", res.data.data.token);

      dispatch(setUser({ user: decode, token: res.data.token }));
      navigate("/");      
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-black/90 h-screen flex justify-center items-center">
        <div className="w-full lg:w-1/4 bg-white/30 border border-pink-200 rounded-xl shadow-lg dark:bg-neutral-900 dark:border-neutral-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-pink-500 dark:text-white">
                Sign in
              </h1>
            </div>

            <div className="mt-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm mb-2 dark:text-white"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        {...register("email")}
                        name="email"
                        className="py-3 px-4 block w-full border-pink-200 border rounded-lg text-sm focus:border-pink-500 focus:ring-pink-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-white dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="password"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type={hide ? "password" : "text"}
                        id="password"
                        {...register("password")}
                        name="password"
                        className="py-3 px-4 block w-full border-pink-200 border rounded-lg text-sm focus:border-pink-500 focus:ring-pink-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        required
                        aria-describedby="password-error"
                      />
                      <span className="absolute right-4 top-2.5">
                        <button type="button" onClick={() => setHide(!hide)}>
                          {hide ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-eye-closed text-gray-400"
                            >
                              <path d="m15 18-.722-3.25" />
                              <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                              <path d="m20 15-1.726-2.05" />
                              <path d="m4 15 1.726-2.05" />
                              <path d="m9 18 .722-3.25" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-eye text-gray-400"
                            >
                              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          )}
                        </button>
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-pink-500 text-white hover:bg-pink-700 disabled:opacity-80 disabled:pointer-events-none"
                  >
                    {isLoading ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-live="polite"
                        aria-busy="true"
                        aria-labelledby="title-01a desc-01a"
                        className="w-4 h-4 animate animate-spin"
                      >
                        <title id="title-01a">Icon title</title>
                        <desc id="desc-01a">Some desc</desc>
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          className="stroke-slate-200"
                          strokeWidth="4"
                        />
                        <path
                          d="M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2"
                          className="stroke-pink-700"
                          strokeWidth="4"
                        />
                      </svg>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </div>
              </form>
              <div className="py-3 flex items-center text-xs text-pink-400 uppercase before:flex-1 before:border-t before:border-pink-200 before:me-6 after:flex-1 after:border-t after:border-pink-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
                Or
              </div>
              <p className="text-sm text-center text-neutral-700 dark:text-neutral-400">
                Don&apos;t have an account yet?{" "}
                <Link
                  className="text-pink-600 decoration-2 hover:underline font-medium dark:text-pink-500"
                  to="/register"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
