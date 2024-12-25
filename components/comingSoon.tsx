// components/ComingSoon.js
import React from 'react';
import { Button } from './ui/button';

export default function ComingSoon() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-primary to-slate-500">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                <svg className="mx-auto mb-4 w-20 h-20 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                    <path d="M11 11h2V6h-2zm0 4h2v-2h-2z" />
                </svg>
                <h1 className="text-3xl font-semibold mb-2">Coming Soon</h1>
                <p className="text-gray-600">We are working hard to bring you something amazing. Stay tuned!</p>
                <form className="mt-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button className="ml-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-slate">
                        Notify Me
                    </Button>
                </form>
            </div>
        </div>
    );
}
