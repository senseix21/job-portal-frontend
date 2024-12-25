"use client"
import { Bell } from 'lucide-react'
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react';

export function NavBar() {
  const [isUser, setIsUser] = useState(false);
  const [userData, setUserData] = useState<{ email: string | null }>({ email: null });

  // Load user data from localStorage if available
  useEffect(() => {
    const storedUserData = localStorage.getItem('user_data');
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setUserData({ email: user.email });
      setIsUser(true);  // User is logged in
    }
  }, []);

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded bg-primary p-1">
              <span className="text-xl font-bold text-primary-foreground">Golang</span>
            </div>
            <span className="text-xl font-semibold">jobs</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="border-b-2 border-primary text-sm font-medium"
            >
              Find Jobs
            </Link>
            <Link
              href="/find-talent"
              className="text-sm font-medium text-muted-foreground"
            >
              Find Talent
            </Link>
            <Link
              href="/upload-job"
              className="text-sm font-medium text-muted-foreground"
            >
              Upload Job
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground"
            >
              About Us
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {!isUser ? (
            <Link href={'/register'}>
              <Button>Register Now</Button>
            </Link>
          ) : (
            <>
              <span className="text-sm font-medium text-muted-foreground">Hello, {userData.email}</span>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
