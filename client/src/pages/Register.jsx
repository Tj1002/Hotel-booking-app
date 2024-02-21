import { Button, Label, Spinner, TextInput } from "flowbite-react";
import toast from "react-hot-toast";
import { Link ,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Register() {
  const navigate=useNavigate()
  const[loading,setLoading]=useState(false)
  const[error,setError]=useState(null)
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit =  handleSubmit(async(data) => {
    console.log(data);
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/v1/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.success === false) {
        console.log(result.error);
        toast.error(data.message);
        return setError(result.message);
      }
      setLoading(false);
      if (response.ok) {
        toast.success("signup successful");
        navigate("/sign-in");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  });
  return (
    <div className="flex flex-col items-center justify-center w-full my-4 ">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="flex flex-col text-3xl md:text-5xl font-semibold text-center mb-4">
          Register
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col w-2/3 md:w-1/3 ">
          <div>
            <Label className="label p-2">
              <span className="text-base label-text">First name</span>
            </Label>
            <TextInput
              type="text"
              id="firstName"
              placeholder="Enter First name"
              {...register("firstName", {
                required: "This field is required",
              })}
            />
            {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )}
          </div>
          <div>
            <Label className="label p-2">
              <span className="text-base label-text">Last name</span>
            </Label>
            <TextInput
              type="text"
              id="lastName"
              placeholder="Enter Last name"
              {...register("lastName", {
                required: "This field is required",
              })}
            />
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </div>
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
          <div>
            <Label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </Label>
            <TextInput
              type="password"
              id="confirmPassword"
              placeholder="Enter Confirm password"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "This field is required";
                  } else if (watch("password") !== val) {
                    return "Your passwords do no match";
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
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
              "Register"
            )} 
          </button>
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Have an account?</span>
          <Link to="/sign-in" className="text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
