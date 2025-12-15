import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
           <div className="w-full max-w-md bg-white p-6 md:p-10 rounded-md shadow-lg">
               <h2 className="text-center font-semibold mb-6">Create your account</h2>
               <form className="space-y-4">
                <div>
                    <Input label="Name" placeholder="John Doe"/>
                </div>
                   <div>
                     <Input label="Email" placeholder="johndoe@example.com"/>
                   </div>
                   <div>
                       <Input label="Password" placeholder="••••••••••••"/>
                   </div>
                   <Button>Register</Button>
               </form>
               <div className="mt-4 text-center text-sm text-gray-500 ">
                   Don't hava an account? <a href="/" className="text-blue-600 hover:underline">Login</a>
               </div>
           </div>
         
       </div>
  )
}

export default Register