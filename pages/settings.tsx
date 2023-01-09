import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NextPage } from "next";
import Particle from './components/particles';

const Settings: NextPage = () => {
    const router = useRouter();
    const [isUnlocked, setIsUnlocked] = useState(false);
    useEffect(() => {
        if (router.isReady) {
            if (router.query.unlock === "yes" || router.query.unlock === "" || router.query.unlock === "true") {
                setIsUnlocked(true);
            } else if (localStorage.getItem("unlocked") === "true") {
                setIsUnlocked(true);
            }
            else {
              router.replace('/')
            }
        }
    }, [router.isReady]);
    return (
      <>
        {isUnlocked && (
        <>
        <Particle />
        <div className="component-wrapper">
          <div className="games-container">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
              <div className="bg-gray-800 rounded-lg shadow-md shadow-gray-400 p-4">
                <h1 className="text-2xl font-bold text-gray-200">About Blank Cloak</h1>
                <p className="text-gray-400">Opens the page as about:blank</p>
                <div className="mt-4">
                  <button onClick={() => { // @ts-ignore
                    window.location.replace('https://google.com'); const win = window.open(); win.document.body.style.margin = '0'; win.document.body.style.height = '100vh'; const iframe = win.document.createElement('iframe'); iframe.style.border = 'none'; iframe.style.width = '100%'; iframe.style.height = '100%'; iframe.style.margin = '0'; const url = window.location.href; iframe.src = url; win.document.body.appendChild(iframe);}} className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-md shadow-md">
                    About Blank Cloak
                  </button>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg shadow-md shadow-gray-400 p-4">
                <h1 className="text-2xl font-bold text-gray-200">Change The Page Title</h1>
                <p className="text-gray-400">Changes The Page Title</p>
                <div className="mt-4">
                  <input onInput={() => {
                    // @ts-ignore
                    document.title=document.getElementById('title').value;
                    // @ts-ignore
                    localStorage.setItem('title',document.getElementById('title').value);
                  }} type="text" id='title' className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md shadow-md" />
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg shadow-md shadow-gray-400 p-4">
                <h1 className="text-2xl font-bold text-gray-200">Change The Page Icon</h1>
                <p className="text-gray-400">Changes The Pages Icon</p>
                <div className="mt-4">
                  <input onChange={() => {
                    // @ts-ignore
                    document.getElementById('faviconico').href=document.getElementById('favicon').value;
                    // @ts-ignore
                    localStorage.setItem('favicon',document.getElementById('favicon').value);
                  }} type="text" id='favicon' className="bg-gray-700 text-gray-200 px-4 py-2 rounded-md shadow-md" />
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg shadow-md shadow-gray-400 p-4">
                <h1 className="text-2xl font-bold text-gray-200">Reset Settings</h1>
                <p className="text-gray-400">Resets All Settings</p>
                <div className="mt-4">
                <button onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }} className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-md shadow-md">
                  Reset Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> 
        </>
        )}    
      </>       
    );
}
export default Settings;