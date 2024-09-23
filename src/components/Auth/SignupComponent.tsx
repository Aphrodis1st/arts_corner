/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../../redux/features/userSlice";
import { useAppDispatch } from "../../redux/hooks/manageState";
import { signupSchema } from "../../utils/formValidations";
import { useNavigate } from "react-router-dom";

const SignUpComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data: any) => {
    const resultAction = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(resultAction)) {
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black p-4">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full bg-black p-10 rounded-lg shadow-lg">
        <div className="bg-[#1a1a1a] p-10 rounded-lg w-full lg:w-3/5 mb-6 lg:mb-0">
          <h1 className="text-3xl font-bold text-white mb-8">
            Sign up for Gallery
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-x-6"
          >
            <div className="mb-6">
              <label className="block text-white mb-2" htmlFor="userName">
                Username:
              </label>
              <input
                className={`w-full p-3 rounded bg-[#2a2a2a] text-white border ${
                  errors.userName ? "border-red-500" : "border-gray-700"
                } focus:outline-none`}
                type="text"
                id="userName"
                placeholder="Enter your username"
                {...register("userName")}
              />
              {errors.userName && (
                <p className="text-red-500 mt-2">{errors.userName.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-white mb-2" htmlFor="firstName">
                First Name:
              </label>
              <input
                className={`w-full p-3 rounded bg-[#2a2a2a] text-white border ${
                  errors.firstName ? "border-red-500" : "border-gray-700"
                } focus:outline-none`}
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-500 mt-2">{errors.firstName.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-white mb-2" htmlFor="lastName">
                Last Name:
              </label>
              <input
                className={`w-full p-3 rounded bg-[#2a2a2a] text-white border ${
                  errors.lastName ? "border-red-500" : "border-gray-700"
                } focus:outline-none`}
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-red-500 mt-2">{errors.lastName.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-white mb-2" htmlFor="email">
                Email Address:
              </label>
              <input
                className={`w-full p-3 rounded bg-[#2a2a2a] text-white border ${
                  errors.email ? "border-red-500" : "border-gray-700"
                } focus:outline-none`}
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
                className={`w-full p-3 rounded bg-[#2a2a2a] text-white border ${
                  errors.password ? "border-red-500" : "border-gray-700"
                } focus:outline-none`}
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 mt-2">{errors.password.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                className="block text-white mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password:
              </label>
              <input
                className={`w-full p-3 rounded bg-[#2a2a2a] text-white border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-700"
                } focus:outline-none`}
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 mt-2">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              className="col-span-2 p-3 bg-gray-700 text-white rounded hover:bg-gray-600 transition duration-200"
              type="submit"
            >
              Sign Up →
            </button>
          </form>

          <p className="text-white mt-4">
            Already have an account?{" "}
            <a href="/login" className="underline">
              Login
            </a>
          </p>
        </div>

        <div className="text-white text-4xl font-bold w-full lg:w-1/2 text-center">
          Join the Gallery Community
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
