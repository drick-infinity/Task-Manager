import {z} from "zod";
export type RegisterFormData ={
    name:string,
    email:string,
    password:string
}
export const registerSchema = z.object({
    name:z.string().nonempty("Name is required").min(2,"Name must be at least 2 characters"),
    email:z.email({pattern:z.regexes.html5Email}).nonempty("Email is required"),
    password:z.string().nonempty("Password is required").min(6,"Password must be at least 6 characters"),
});
