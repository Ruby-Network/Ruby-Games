import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Tiles from './components/games';
const tiles = require('./json/tiles.json');
import { useRouter } from 'next/router';
import { useState } from 'react';
import Particle from './components/particles';

const Games: NextPage = () => {
  const [isUnlockedForGames, setIsUnlockedForGames] = useState(false)
  const router = useRouter();
  React.useEffect(() => {
    if (router.isReady) {
      if (router.query.unlock === 'true' || router.query.unlock === 'yes' || router.query.unlock === '') {
        console.log('unlock');
        setIsUnlockedForGames(true)
    } else if (localStorage.getItem('unlocked') === 'true') {
      setIsUnlockedForGames(true)
    }
    else {
      // immediately redirect to home page
      router.replace('/')
    }
    }
  }, [router.isReady])
  return (
    <>
     {isUnlockedForGames && 
        <div className="component-wrapper">
          <div className="games-container">
            <Particle />
            <Tiles tiles={tiles} />
        </div>
      </div>}
    </>
    );
};

export default Games;