import {z } from "zod";
export type LoginFormData = {
    email: string;
    password: string;
  };
export const loginSchema = z.object({
    email:z.email({pattern:z.regexes.html5Email}).nonempty("Email is required"),
    password:z.string().nonempty("Password is required").min(6,"Password must be at least 6 characters"),
});

