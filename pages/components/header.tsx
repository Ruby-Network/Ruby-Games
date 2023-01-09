import React from 'react';
import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()
  const [isUnlocked, setIsUnlocked] = React.useState(false);
  React.useEffect(() => {
    if (router.isReady) {
      if (router.query.unlock === 'yes' || router.query.unlock === '' || router.query.unlock === 'true') {
        setIsUnlocked(true)
        // get localstorage
        let local = localStorage.getItem('unlocked')
        if (local === null || local === 'false' || local === 'undefined' || local === 'null' || local === '' || local === ' ' || local === '\'') {
          localStorage.setItem('unlocked', 'true')
        }
      }
      if (localStorage.getItem('unlocked') === 'true') {
        setIsUnlocked(true)
      }
      if (localStorage.getItem('title')) {
        // @ts-ignore 
        document.title = localStorage.getItem('title')
      } else if (!localStorage.getItem('title') && localStorage.getItem('unlocked')) {
        // @ts-ignore
        document.title = 'Ruby Games'
      }
      if (localStorage.getItem('favicon')) {
        // @ts-ignore
        document.getElementById('faviconico').setAttribute('href', localStorage.getItem('favicon'))
      }
     }}, [router.isReady])
  return (
    <nav className=" bg-gray-800 p-3 flex items-center justify-between fixed top-0 left-0 right-0 z-10">
      <div>
      <img src="/assets/LOGO.svg" alt="Logo" className="w-20 p-2" />
      </div>
      <div className="flex items-center space-x-4">
        {!isUnlocked && <button onClick={() => router.replace('/')} className="text-gray-400 hover:text-gray-200 rounded-full px-3 py-2 border-2 border-gray-400 cursor-pointer">Home</button>}
        {isUnlocked && <button onClick={() => router.replace('/?unlock')} className="text-gray-400 hover:text-gray-200 rounded-full px-3 py-2 border-2 border-gray-400 cursor-pointer">Home</button>}
        {isUnlocked && <button onClick={() => router.replace('/games/?unlock')} className="text-gray-400 hover:text-gray-200 rounded-full px-3 py-2 border-2 border-gray-400 cursor-pointer">Games</button>}
        {isUnlocked && <button onClick={() => router.replace('/settings/?unlock')} className="text-gray-400 hover:text-gray-200 rounded-full px-3 py-2 border-2 border-gray-400 cursor-pointer">Settings</button>}
        {!isUnlocked && <button onClick={() => router.replace('https://dsc.gg/natantnetwork')} className="text-gray-400 hover:text-gray-200 rounded-full px-3 py-2 border-2 border-gray-400 cursor-pointer">Discord</button>}
      </div>
    </nav>
  );
}

export default Header;