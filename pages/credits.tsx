import React  from "react";
import { useRouter } from "next/router";
import Particle from './components/particles';

const Credits = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-6xl font-bold text-white">
                    Credits
                </h1>
                <p className="mt-3 text-2xl text-white">
                    Credit to <a href='https://3kh0.github.io/' target='_blank' rel="noopener" className="text-blue-500 cursor-pointer mb-20">Echo</a> for some of the games!
                </p>
                <p className="mt-3 text-2xl text-white">
                    All Games are owned by their respective owners.
                </p>
            </main>
            <Particle />
        </div>
    )
}

export default Credits