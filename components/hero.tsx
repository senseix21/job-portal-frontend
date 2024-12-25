import React from 'react'

const Hero = () => {
    return (
        <div className="bg-gradient-to-r from-primary to-primary-foreground text-white bg-teal">
            <div className="container py-16 relative overflow-hidden">
                <div
                    style={{
                        position: 'absolute',
                        inset: '0',
                        backgroundImage: "url('/grid.svg')",
                        backgroundPosition: 'center',
                        maskImage: 'linear-gradient(180deg, white, rgba(41, 190, 176, 1))'
                    }}
                ></div>

                <div className="relative z-10 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl md:text-6xl font-bold m-4 ">Find Your Dream Golang Job</h1>
                        <p className="text-xl md:text-2xl m-8 max-w-2xl">
                            Discover exciting opportunities in the world of Go programming.
                            From startups to tech giants, find the perfect role to advance your career.
                        </p>
                    </div>
                    <div className="hidden lg:block w-1/3 h-64">
                        <img src="/golang.svg" alt="Go gopher" className="w-full h-full object-contain" />
                    </div>
                </div>
                <div className="absolute right-0 bottom-0 w-1/3 h-2/3 bg-[url('/gopher.svg')] bg-contain bg-no-repeat bg-right-bottom opacity-20"></div>
            </div>
        </div>)
}

export default Hero