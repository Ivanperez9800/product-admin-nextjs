'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";


//PARA VALIDACION FORMULARIOS
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//para el registro de usuario
import { createUser, setDocument, updateUser } from "@/lib/firebase";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";



import { User } from "@/interfaces/user.interface";







const SignUpForm = () => {

    const [isLoading, setisLoading] = useState<boolean>(false  )
    


    // ==== FORM VALIDATION ===
    const formSchema = z.object({
        uid:z.string(),
        name:z.string().min(4,{message:"This field must contain at less 4 characters "}),
        email:z.string().email("Email format is not valid. Example: user@mail.com").min(1,{message:"This field is required"}),
        password:z.string().min(8,{message:"This field must contain at less 8 characters "}),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            uid:"",
            name:"",
            email:"",
            password:""
        }
    })

    const { register,handleSubmit,formState } = form;

    const {errors} = formState

    const onSubmit = async (user:z.infer<typeof formSchema>) =>{
        // console.log(user)

        setisLoading(true)
        try {
            const res = await createUser(user) 
            await updateUser({displayName: user.name })
            user.uid = res.user.uid

            await createUserInDb(user as User);



        } catch (error:any) {
            toast.error(error.message,{duration:2500})
        }finally{
            setisLoading(false)
        }
    }


//GUARDA EL USUARIO EN LA BASE DE DATOS
    const createUserInDb = async (user:User)=>{
        const path = `users/${user.uid}`
        
        setisLoading(true);
        try {
            delete user.password; 
            await setDocument(path,user);

            toast(`Bienvenido ${user.name}`)

        } catch (error:any) {
            toast.error(error.message,{duration:2500})
        }finally{
            setisLoading(false)
        }
    } 

    return (
        <>
            <div className="text-center">
                <h1 className="text-2xl font-semibold">Create Account</h1>
                <p className="text-sm text-mute-foreground ">Enter your email and password to sign in</p>


            </div>

            <form onSubmit={handleSubmit(onSubmit)} >


                {/*NAME*/}
                <div className="grid gap-2 ">
                    <div className="mb-3">
                        <Label htmlFor="name" >Name</Label>
                        <Input id="name" placeholder="Jhon Doe" type="text" {...register("name")} />
                        <p className="form-errors" >{errors.name?.message}</p>
                    </div>
                </div>


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
                {/* === Submit === */}

                <Button type="submit" disabled={isLoading} >
                    {isLoading && (
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin " />
                    )}
                    Create
                    </Button>
                </div>


 
            </form>
            {/*Sign up */}
            <p className="text-center text-sm text-muted-foreground">
                Do you already have an account?{" "}
                <Link href="/" className="underline underline-offset-4 hover:text-primary ">Sign in</Link> 
            </p>
        </>
    );
}

export default SignUpForm;