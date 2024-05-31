'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";


//PARA VALIDACION FORMULARIOS
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";



const SignInForm = () => {

    // ==== FORM VALIDATION ===
    const formSchema = z.object({
        email:z.string().email("Email format is not valid. Example: user@mail.com").min(1,{message:"This field is required"}),
        password:z.string().min(8,{message:"This field must contain at less 8 characters "}),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            email:"",
            password:""
        }
    })

    const { register,handleSubmit,formState } = form;

    const {errors} = formState

    const onSubmit = (user:z.infer<typeof formSchema>) =>{
        console.log(user)
    }

    return (
        <>
            <div className="text-center">
                <h1 className="text-2xl font-semibold">Sign In</h1>
                <p className="text-sm text-mute-foreground ">Enter your email and password to sign in</p>


            </div>

            <form onSubmit={handleSubmit(onSubmit)} >

                {/*EMAIL*/}
                <div className="grid gap-2 ">
                    <div className="mb-3">
                        <Label htmlFor="email" >Email</Label>
                        <Input id="email" placeholder="name@example.com" type="email" autoComplete="email"  {...register("email")} />
                        <p className="form-errors" >{errors.email?.message}</p>
                    </div>
                </div>

                {/*PASSWORD */}

                <div className="grid gap-2 ">
                    <div className="mb-3">
                        <Label htmlFor="password" >Password</Label>
                        <Input id="password" placeholder="********" type="password" {...register("password")} />
                        <p className="form-errors" >{errors.password?.message}</p>
                    </div>
                <Link href="/forgot-password" className="underline text-muted-foreground underline-offset-4 hover:text-primary mb-6 text-sm text-end">Forgot passoword?</Link> 

                {/* === Submit === */}

                <Button type="submit">Sign In</Button>
                </div>


 
            </form>
            {/*Sign up */}
            <p className="text-center text-sm text-muted-foreground">
                You dont have an account?{" "}
                <Link href="/sign-up" className="underline underline-offset-4 hover:text-primary ">Sign up</Link> 
            </p>
        </>
    );
}

export default SignInForm;