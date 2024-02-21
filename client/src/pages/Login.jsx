import { Button, Label, Spinner, TextInput } from "flowbite-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/features/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.success === false) {
        console.log(result.error);
        toast.error("Invalid credentials");
        return setError(result.message);
      }
      setLoading(false);
      if (response.ok) {
        toast.success("Login successful");
        console.log(result.data.user);
        dispatch(signInSuccess(result.data.user))
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error("Login failure");

    }
  });
  return (
    <div className="flex flex-col items-center justify-center w-full my-8 ">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="flex flex-col text-3xl md:text-5xl font-semibold text-center mb-4">
          Login
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col w-2/3 md:w-1/3 ">
          <div>
            <Label className="label p-2">
              <span className="text-base label-text">Email</span>
            </Label>
            <TextInput
              type="email"
              id="email"
              placeholder="Enter Email"
              {...register("email", {
                required: "This field is required",
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div>
            <Label className="label">
              <span className="text-base label-text">Password</span>
            </Label>
            <TextInput
              type="password"
              id="password"
              placeholder="Enter Password"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be of atleast 6 character",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <button
            className="mt-6 bg-[#0c3b2e] text-white rounded-lg py-2"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}
        <div className="flex gap-2 text-sm mt-5">
          <span> Don't have an account?</span>
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
