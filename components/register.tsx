
'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useForm, Resolver } from "react-hook-form"
import { useUserLoginMutation, useUserRegisterMutation } from "@/redux/api/authApi"
import { toast } from "@/hooks/use-toast"
import { ToastAction, ToastViewport } from "./ui/toast"
import { ToastProvider } from "@radix-ui/react-toast"


type FormValues = {
    name: string
    email: string
    password: string
}

const resolver: Resolver<FormValues> = async (values) => {
    const errors: any = {}

    // Name Validation
    if (!values.name) {
        errors.name = {
            type: "required",
            message: "Name is required.",
        }
    }

    // Email Validation
    if (!values.email) {
        errors.email = {
            type: "required",
            message: "Email is required.",
        }
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = {
            type: "pattern",
            message: "Email is not valid.",
        }
    }

    // Password Validation
    if (!values.password) {
        errors.password = {
            type: "required",
            message: "Password is required.",
        }
    } else if (values.password.length < 6) {
        errors.password = {
            type: "minLength",
            message: "Password must be at least 8 characters long.",
        }
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {}, // Return values only if no errors
        errors,
    }
}


export const RegisterForm = ({ setIsLogin }: { setIsLogin: (value: boolean) => void }) => {

    const [registerUser] = useUserRegisterMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ resolver })
    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        const res = await registerUser(data);
        console.log(res)
        if (res.error) {
            toast({
                title: "Login failed",
                description: "Please try again.",
                action: (
                    <ToastAction altText="Retry">Retry</ToastAction>
                ),
            });
        } else {
            toast({
                title: "Login successful",
                description: "Welcome back!",
            });
            setIsLogin(true);
        }

    })
    return (
        <ToastProvider>

            <div>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            {...register("email")}
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="h-12"
                        />
                        {errors?.email && <p>{errors.email.message}</p>}

                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            {...register("name")}
                            id="username"
                            type="text"
                            placeholder="Choose a username"
                            className="h-12"
                        />
                        {errors?.name && <p>{errors.name.message}</p>}

                    </div>



                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            {...register("password")}
                            id="password"
                            type="password"
                            placeholder="Password (min. 8 characters)"
                            className="h-12"
                        />
                        {errors?.password && <p>{errors.password.message}</p>}

                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I agree with{" "}
                            <Link href="#" className="font-semibold hover:underline">
                                Terms & Conditions
                            </Link>
                        </label>
                    </div>


                    <Button type="submit" className="w-full h-12 text-base font-semibold bg-black hover:bg-black/90">
                        Join GoJobs
                    </Button>

                    <p className="text-center text-sm">
                        <>
                            Already have an account?{" "}
                            <button
                                type="button"
                                className="font-semibold hover:underline text-blue-500"
                                onClick={() => setIsLogin(true)}

                            >
                                Login now
                            </button>
                        </>

                    </p>
                </form>
                <ToastViewport className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4" />

            </div>
        </ToastProvider>

    )
}

