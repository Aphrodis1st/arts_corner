/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginUser } from "../../redux/features/userSlice";
import { useAppDispatch } from "../../redux/hooks/manageState";
import { loginSchema } from "../../utils/formValidations";
import { useNavigate } from "react-router-dom";
import decodeToken from "../../utils/decode";
const LoginComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const user = decodeToken(token);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    await dispatch(loginUser(data));
    if (user?.role === "ADMIN" || user?.role === "ARTIST") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black p-4">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full bg-black p-10 rounded-lg shadow-lg px-[10%] mx-auto">
        <div className="bg-[#1a1a1a] p-10 rounded-lg w-full lg:w-1/2 mb-6 lg:mb-0 ">
          <h1 className="text-3xl font-bold text-white mb-8">
            Login to Gallery
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className="block text-white mb-2" htmlFor="email">
                Email Address:
              </label>
              <input
                className={`w-full p-3 rounded bg-[#2a2a2a] text-white border ${errors.email ? "border-red-500" : "border-gray-700"} focus:outline-none`}
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 mt-2">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-white mb-2" htmlFor="password">
                Password:
              </label>
              <input
                className={`w-full p-3 rounded bg-[#2a2a2a] text-white border ${errors.password ? "border-red-500" : "border-gray-700"} focus:outline-none`}
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 mt-2">{errors.password.message}</p>
              )}
            </div>

            <button
              className="w-full p-3 bg-gray-700 text-white rounded hover:bg-gray-600 transition duration-200 "
              type="submit"
            >
              Login →
            </button>
          </form>

          <p className="text-white mt-4">
            Don’t have an account?{" "}
            <a href="/register" className="underline">
              Sign up
            </a>
          </p>
        </div>

        <div className="text-white text-4xl font-bold w-full lg:w-1/2 text-center">
          Welcome to arts&apos;s corner
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
