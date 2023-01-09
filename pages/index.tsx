import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import React from 'react';
import Particle from './components/particles';
import Tiles from './json/tiles.json';
import { motion } from 'framer-motion';


const Home: NextPage = () => {
  const [isUnlockedForIndex, setIsUnlockedForIndex] = useState(false)
  const router = useRouter()
  React.useEffect(() => {
    if (router.isReady) {
      if (router.query.unlock === 'yes' || router.query.unlock === '' || router.query.unlock === 'true') {
        setIsUnlockedForIndex(true)
      } else if (localStorage.getItem('unlocked') === 'true') {
        setIsUnlockedForIndex(true)
      } else {
        console.log('not unlocked')
        router.replace('/')
    }
    }
  }, [router.isReady])
  return (
    <>
    <Particle />
    <div className="overflow-hidden">
    <div className="flex h-screen items-center overflow-hidden">
      <div className="group relative mx-auto w-100 overflow-hidden rounded-[16px] bg-gray-700 p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
        <div className="group-hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible overflow-hidden"></div>
         <div className="relative rounded-[15px] bg-gray-900 p-6 overflow-hidden">
          {!isUnlockedForIndex && 
            <div className="space-y-4 overflow-hidden">
              <img src="/assets/LOGO.svg" alt="Logo"  className='w-24'/>
                <p className="text-lg font-semibold text-slate-300">Welcome!</p>
                <p className="font-md text-slate-500">
                  This is a small project made by Natant Network. Designed with simplicity in mind.
                </p>
            </div>}
            {isUnlockedForIndex && 
            <div className="space-y-4 overflow-hidden">
            <img src="/assets/LOGO.svg" alt="Logo"  className='w-24'/>
              <p className="text-lg font-semibold text-slate-300">Featured Game</p>
              <p className="text-lg font-semibold text-slate-400">Slope</p>
              <p className="font-md text-slate-500">
                Slope is a game where you have to avoid the obstacles and get the highest score possible.
              </p>
              <button onClick={ () => router.replace('/games/game?unlock&game=Slope')} className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-4 py-2 rounded-md hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 ease-in-out">Play</button>
          </div>}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default Home
