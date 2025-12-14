import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label?:string;
    error?:string;
    className?:string;
}

export function Input({label,error,className="",...props}:InputProps){
    const base="w-full rounded-md px-3 py-2.5 text-sm transition focus:outline-none focus:ring-2";

    const primaryVariant = "border border-[#CADCFC] bg-[#F5F8FF] focus:border-[#00246B] focus:ring-[#00246B]";

    return(
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-sm font-medium text-gray-700">{label}</label>
            )}

            <input {...props} className={`${base} ${primaryVariant} ${className}`}/>

            {error && (
                <span className="text-xs text-red-500">{error}</span>
            )}
        </div>
    )
}