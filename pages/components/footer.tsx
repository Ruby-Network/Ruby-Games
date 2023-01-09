import React from 'react';
import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter();
  const [isUnlocked, setIsUnlocked] = React.useState(false);
  const [isGamePage,  setIsGamePage] = React.useState(false);
  React.useEffect(() => {
    if (router.isReady) {
      if (router.query.unlock === 'yes' || router.query.unlock === '' || router.query.unlock === 'true') {
        setIsUnlocked(true)
      }
      if (router.pathname === '/games/game') {
        setIsGamePage(true)
      } 
    }
  }, [router.isReady])
  // listen for route changes
  try {
  router.events.on('routeChangeComplete', () => {
    if (router.isReady) {
      if (router.pathname === '/games/game') {
        setIsGamePage(true)
      } else {
        setIsGamePage(false)
      }
    }
  })
  } catch (error) {
  }

  if (isGamePage) return null;
 return ( 
  <footer className="bg-gray-900 text-white px-4 py-5 fixed bottom-0 left-0 right-0 z-10">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
      <p className="text-center md:text-left">
        {!isUnlocked && <button onClick={() => {router.replace('/privacy-policy')}} className="text-blue-500 hover:text-blue-800 mr-4">
          Privacy policy
        </button>}
        {isUnlocked && <button onClick={() => {router.replace('/privacy-policy/?unlock')}} className="text-blue-500 hover:text-blue-800 mr-4">
          Privacy policy
        </button>}
        {!isUnlocked && <button onClick={() => {router.replace('/terms-of-service')}} className="text-blue-500 hover:text-blue-800 mr-4">
          Terms of service
        </button>}
        {isUnlocked && <button onClick={() => {router.replace('/terms-of-service/?unlock')}} className="text-blue-500 hover:text-blue-800 mr-4">
          Terms of service
        </button>}
        {isUnlocked && <button onClick={() => {router.replace('/credits')}} className="text-blue-500 hover:text-blue-800 mr-4">Credits</button>}
      </p>
      <p className="text-center md:text-right">
        <button onClick={() => {router.replace('https://github.com/natantnetwork')}} className="text-blue-500 hover:text-blue-800 mr-4">
          GitHub
        </button>
        <button onClick={() => {router.replace('https://dsc.gg/natantnetwork')}} className="text-blue-500 hover:text-blue-800 mr-4">
          Discord
        </button>
        {/* <button href="https://twitter.com/username" className="text-blue-500 hover:text-blue-800">
          Twitter
        </a> */}
      </p>
    </div>
  </footer>
  );
};

export default Footer;