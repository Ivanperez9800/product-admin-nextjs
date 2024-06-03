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
import { sendResetEmail } from "@/lib/firebase";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



const RecoverPasswordForm = () => {

    const [isLoading, setisLoading] = useState<boolean>(false)
    const router = useRouter()



    // ==== FORM VALIDATION ===
    const formSchema = z.object({
        email:z.string().email("Email format is not valid. Example: user@mail.com").min(1,{message:"This field is required"})
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            email:""
        }
    })

    const { register,handleSubmit,formState } = form;

    const {errors} = formState

    const onSubmit = async (user:z.infer<typeof formSchema>) =>{
        // console.log(user)

        setisLoading(true)
        try {
            await sendResetEmail(user.email);
            toast.success("Email sent successfully")
            router.push("/")


        } catch (error:any) {
            toast.error(error.message,{duration:2500})
        }finally{
            setisLoading(false)
        }
    }

    return (
        <div className="md:border border-solid border-gray-300 rounded-xl p-10" >
            <div className="text-center">
                <h1 className="text-2xl font-semibold">Recover Password</h1>
                <p className="text-sm text-mute-foreground ">we will send you a email to reset your password</p>


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

                <div className="grid gap-2 ">

                {/* === Submit === */}

                <Button type="submit" disabled={isLoading} >
                    {isLoading && (
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin " />
                    )}
                    Recover Password
                    </Button>
                </div>


 
            </form>
            {/*Sign up */}
            <p className="text-center text-sm text-muted-foreground mt-3 ">
                <Link href="/" className="underline underline-offset-4 hover:text-primary ">{"<- Go back?"}</Link> 
            </p>
        </div>
    );
}

export default RecoverPasswordForm