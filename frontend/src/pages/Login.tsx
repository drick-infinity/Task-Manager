import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
        <div className="w-full max-w-md bg-white p-6 md:p-10 rounded-md shadow-lg">
          <h1 className="font-semibold">Welcome Back,</h1>
            <h4 className="text-gray-500 font-semibold mb-6">Log in to your account</h4>
            <form className="space-y-4">
                <div>
                  <Input label="Email" placeholder="johndoe@example.com"/>
                </div>
                <div>
                    <Input label="Password" placeholder="••••••••••••"/>
                </div>
                <Button>Login</Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-500 ">
                Don't hava an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
            </div>
        </div>
      
    </div>
  )
}

export default Login
