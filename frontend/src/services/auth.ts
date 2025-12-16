import { LoginFormData } from "../schema/loginSchema";
import { RegisterFormData } from "../schema/registerSchema";

const BACKEND_URL="http://localhost:5000/api/v1";
export const loginRequest=async(
    url:string,
    {arg}:{arg:LoginFormData}
)=>{
    const res = await fetch(`${BACKEND_URL}${url}`,{
        method:"POST",
        headers:{
            "Content-type":"application/json",
        },
        credentials:"include",
        body:JSON.stringify(arg),
    });

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message || "Login failed");
    }
    return data;
}

export const registerRequest = async(
    url:string,
    {arg}:{arg:RegisterFormData}
)=>{
    const res = await fetch(`${BACKEND_URL}${url}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify(arg),
    });
    const data = await res.json();
    if(!res.ok){
        throw new Error(data.message || "Registration failed");
    }
    return data;
}