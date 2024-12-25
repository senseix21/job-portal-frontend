'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Briefcase, Code, Globe } from 'lucide-react'
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useForm, Resolver } from "react-hook-form"
import { useUserLoginMutation } from "@/redux/api/authApi"
import LoginForm from "@/components/login"
import { RegisterForm } from "@/components/register"



export default function SignupPage() {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <NavBar />

            {/* Main Content */}
            <main className="pt-20 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 py-12">
                        {/* Left Column - Form */}
                        <div className="max-w-md mx-auto lg:mx-0 w-full">
                            <h1 className="text-4xl font-bold mb-8">
                                {isLogin ? "Login to GoJobs" : "Join GoJobs"}
                            </h1>

                            <>
                                {/* Avatar Stack */}
                                <div className="flex mb-4">
                                    {[...Array(7)].map((_, i) => (
                                        <div key={i} className="-ml-3 first:ml-0">
                                            <Avatar>
                                                <AvatarImage src={`https://randomuser.me/api/portraits/men/${i + 1}.jpg`} alt={`Random user ${i + 1}`} height={100} />
                                                <AvatarFallback>Go</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-lg mb-8">
                                    Join thousands of{" "}
                                    <span className="font-semibold">GoLang Developers</span>{" "}
                                    and find your dream job today.
                                </p>
                            </>
                            {!isLogin ? <>
                                <RegisterForm setIsLogin={setIsLogin} />
                            </> :
                                <>
                                    <LoginForm setIsLogin={setIsLogin} />
                                </>
                            }



                        </div>

                        {/* Right Column - Features */}
                        <div className="lg:pl-12">
                            <h2 className="text-4xl font-bold mb-24">
                                Discover top GoLang opportunities in leading companies across the globe.
                            </h2>

                            <hr className="my-4" />

                            <div className="space-y-12">
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                                            <Briefcase className="w-6 h-6 text-yellow-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            Thousands of jobs available.
                                        </h3>
                                        <p className="text-gray-600">
                                            Explore opportunities from top companies seeking skilled GoLang developers worldwide.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                            <Code className="w-6 h-6 text-blue-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            Skill-focused platform.
                                        </h3>
                                        <p className="text-gray-600">
                                            Showcase your GoLang expertise and let companies find you based on your skill set.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                            <Globe className="w-6 h-6 text-green-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            Remote opportunities.
                                        </h3>
                                        <p className="text-gray-600">
                                            Work remotely with companies that support distributed teams across the globe.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
