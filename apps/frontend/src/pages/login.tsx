import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormData } from "../types";
import FormField from "../formFields/loginformField.tsx";
import axios from "axios";
import { BACKEND_URL } from "../config.ts";
import { useNavigate } from "react-router-dom";
import { LoginAppbar } from "../components/loginAppbar.tsx";
import { zodResolver } from "@hookform/resolvers/zod"
import { SigninSchema } from "../schema/index.ts";
import { toast } from "react-toastify"
import { useAuthRedirect } from "@/hooks/use-auth-redirect.ts";
const Login: React.FC = () => {
  useAuthRedirect()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(SigninSchema)
  })

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    console.log("submiting")
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        email: data.email,
        password: data.password,
      });
      console.log(res)
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
      toast("You signed up Successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    catch (e) {
      console.log(e)
      if (axios.isAxiosError(e)) {
        if (e.status === 403) {
          toast("You don't have a account, you have to signup first", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate("/signup")
        }
      }
    }
  };

  return (
    <div className="px-10">
      <LoginAppbar />
      <div className="flex items-center justify-center gap-[100px] mt-[150px] ">


        <div className="flex pt-20 px-4 gap-3 flex-col max-w-[500px]">
          <div className="font-semibold text-4xl pb-4 ">
            Automate across your teams
          </div>
          <p className="text-xl ">Zapier Enterprise empowers everyone in your business to securely automate their work in minutes, not months—no coding required.</p>


        </div>
        <div className="">
          <h1 className="text-3xl text-center ">Log in to your account</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[500px] mt-10">
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
            <button type="submit" className="w-[500px] px-5 py-2 rounded-xl border-[1px]">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
