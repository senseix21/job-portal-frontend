'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useUserLoginMutation } from "@/redux/api/authApi"
import { toast } from "@/hooks/use-toast"
import { ToastAction } from "./ui/toast"
import { LoginResponse } from "@/interfaces"

interface FormValues {
    email: string;
    password: string;
}

const resolver = async (values: FormValues) => {
    const errors: Record<string, string> = {};
    if (!values.email) {
        errors.email = 'Email is required';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    }
    return {
        values: Object.keys(errors).length === 0 ? values : {}, // Return values only if no errors
        errors,
    };
};

const LoginForm = ({ setIsLogin }: { setIsLogin: (value: boolean) => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ resolver });

    const [userLogin] = useUserLoginMutation();

    const onSubmit = handleSubmit(async (data) => {
        console.log('clicked ..');
        console.log(data);

        try {
            const response = await userLogin(data) as { data: LoginResponse; error?: unknown }; // Assuming userLogin handles the API call
            console.log(response.data, '49');
            const token = response.data.data.token
            console.log(token, '49');

            if (response.error) {
                // Show error toast if login failed
                toast({
                    title: "Login failed",
                    description: "Please try again.",
                    action: <ToastAction altText="Retry">Retry</ToastAction>,
                });
            } else {
                // Login success toast
                toast({
                    title: "Login successful",
                    description: "Welcome back!",
                });

                // Extract token from the response and store it in localStorage
                if (response.data && response.data.data.token) {
                    const token = response.data.data.token;
                    localStorage.setItem('auth_token', token); // Store in localStoraghgkjnhjkn
                    localStorage.setItem('user_data', JSON.stringify(response.data.data.user)); // Store user data

                    console.log('Token saved to localStorage:', token);
                } else {
                    console.warn('Token not found in response.');
                }

                setIsLogin(true); // Update login state
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
            });
        }
    });





    return (
        <div>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        {...register("email")}
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        className="h-12"
                    />
                    {errors?.email && <p>{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        {...register("password")}
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="h-12"
                    />
                    {errors?.password?.message && <p>{errors.password.message}</p>}
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
                        Don’t have an account?{" "}
                        <button
                            type="button"
                            className="font-semibold hover:underline text-blue-500"
                            onClick={() => setIsLogin(false)}
                        >
                            Register now
                        </button>
                    </>
                </p>
            </form>
        </div>
    )
}

export default LoginForm