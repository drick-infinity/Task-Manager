import { useForm } from "react-hook-form"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { registerSchema,RegisterFormData} from "../schema/registerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerRequest } from "../services/auth"
import useSWRMutation from "swr/mutation"
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
 const {register , handleSubmit,formState: { errors },} = useForm<RegisterFormData>({resolver:zodResolver(registerSchema)});
 const {trigger:registerUser,isMutating,error} = useSWRMutation("/register",registerRequest)
 const onSubmit = async(data:RegisterFormData)=>{
  try{
  const res = await registerUser(data);
  console.log("Registered Successful:" ,res);
  navigate('/');
  }catch(err){
    console.error(err);
  }
 }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
           <div className="w-full max-w-md bg-white p-6 md:p-10 rounded-md shadow-lg">
               <h2 className="text-center font-semibold mb-6">Create your account</h2>
               <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input type="text" label="Name" placeholder="John Doe" {...register("name")}
                   error={errors.name?.message}/>
                </div>
                   <div>
                     <Input type="email" label="Email" placeholder="johndoe@example.com" {...register("email")}
                   error={errors.email?.message}/>
                   </div>
                   <div>
                       <Input type="password" label="Password" placeholder="••••••••••••" {...register("password")}
            error={errors.password?.message}/>
                   </div>
                   {error && <p>{error.message}</p>}
                   <Button type="submit" disabled={isMutating}> {isMutating?"Creating sccount...":"Register"}</Button>
               </form>
               <div className="mt-4 text-center text-sm text-gray-500 ">
                   Don't hava an account? <a href="/" className="text-blue-600 hover:underline">Login</a>
               </div>
           </div>
         
       </div>
  )
}

export default Register