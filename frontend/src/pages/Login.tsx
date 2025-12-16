import { useForm } from "react-hook-form"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { loginSchema ,LoginFormData} from "../schema/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginRequest } from "../services/auth"
import useSWRMutation from "swr/mutation"
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const {register , handleSubmit,formState: { errors },} = useForm<LoginFormData>({resolver:zodResolver(loginSchema)});
  const {trigger:login,isMutating,error} =useSWRMutation("/",loginRequest);
  const onSubmit = async(data: LoginFormData) => {
    try{
      const res = await login(data);
      console.log("Login success:", res);
      navigate("/dashboard");
    }
    catch(err){
      console.error(err);
    }
    
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
        <div className="w-full max-w-md bg-white p-6 md:p-10 rounded-md shadow-lg">
          <h1 className="font-semibold">Welcome Back,</h1>
            <h4 className="text-gray-500 font-semibold mb-6">Log in to your account</h4>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Input type="email" label="Email" placeholder="johndoe@example.com"
                   {...register("email")}
                   error={errors.email?.message}/>
                </div>
                <div>
                    <Input type="password" label="Password" placeholder="••••••••••••"  {...register("password")}
            error={errors.password?.message}/>
                </div>
                {error && (
        <p className="text-red-500 text-sm">
          {error.message}
        </p>
      )}
                <Button type="submit" disabled={isMutating}>{isMutating?"Logging in...":"Login"}</Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-500 ">
                Don't hava an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
            </div>
        </div>
      
    </div>
  )
}

export default Login
