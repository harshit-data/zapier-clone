import { useForm, SubmitHandler } from "react-hook-form";
import {SignupFormData } from "../types";
import FormField from "../formFields/signupFormField.tsx";
import axios from "axios";
import { BACKEND_URL } from "../config.ts";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod"
import { SignupSchema } from "../schema/index.ts";
import { toast } from "react-toastify"
import { CheckFeature } from "../components/CheckFeature.tsx";
import { SignupAppbar } from "../components/signupAppBar.tsx";
const Signup: React.FC = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema)
  })

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    console.log("submiting")
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        username:data.username,
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    }
    catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.status === 403) {
          toast("You already have an account, login here", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate("/login")
        }
      }
    }
    console.log(data);
  };

  return (
    <div className="px-10">
      <SignupAppbar />
      <div className="flex items-center justify-center gap-[100px] mt-[150px] ">
      <div className="flex-1 pt-20 px-4 max-w-[500px]">
                    <div className="font-semibold text-3xl pb-4">
                    Join millions worldwide who automate their work using Zapier.
                    </div>
                    <div className="pb-6 pt-4">
                        <CheckFeature label={"Easy setup, no coding required"} />
                    </div>
                    <div className="pb-6">
                        <CheckFeature label={"Free forever for core features"} />
                    </div>
                    <CheckFeature label={"14-day trial of premium features & apps"} />

                </div>
        <div className=" border-[1px] p-5">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-[500px] mt-10">
            <FormField
              type="text"
              placeholder="Username"
              name="username"
              register={register}
              error={errors.email}
            />
            <FormField
              type="email"
              placeholder="Email"
              name="email"
              register={register}
              error={errors.email}
            />
            <FormField
              type="password"
              placeholder="Password"
              name="password"
              register={register}
              error={errors.password}
            />
            <button type="submit" className="w-[500px] bg-[#ff4f01] text-white font-lg px-5 py-2 rounded-xl border-[1px]">Get Started For Free</button>
          </form>
          <p className="mt-4">already have an Account <Link to={"/signup"} className="underline text-blue-500">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
