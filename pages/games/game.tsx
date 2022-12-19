import React from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Particle from '../components/particles';
const Game: NextPage = (props) => {
    const router = useRouter();
    let game: string | string[] | undefined;
    // state
    let [gameName, setGameName] = React.useState('');
    let [isCybertanks, setIsCybertanks] = React.useState(false);
    React.useEffect(() => {
        if (router.isReady) {
                let unlock = router.query.unlock;
                if(unlock === 'yes' || unlock === '' || unlock === 'true') {
                    console.log('unlocked');
                    game = router.query.game;
                    if (game === undefined) {
                        router.push('/games?unlock');
                    } else {
                        setGameName(`${game.toString().replace(/\s+/g, '-').toLowerCase()}`);
                    }
                } else if (localStorage.getItem('unlocked') === 'true') {
                    unlock = 'yes';
                    game = router.query.game;
                    if (game === undefined) {
                        router.push('/games?unlock');
                    } else {
                        setGameName(`${game.toString().replace(/\s+/g, '-').toLowerCase()}`);
                    }
                }
                else {
                    router.push('/');
                }
                if (router.query.game === 'Cybertanks') {
                    setIsCybertanks(true);
                    console.log('cybertanks');
                }
            }
        }, [router.isReady]);
    // remove spaces from game name and add dashes
    return (
        <>
            {gameName && (
                <>
                    <Particle />
                    <iframe src={`/games/${gameName}/index.html`} className="games-iframe overflow-hidden" frameBorder="0" ></iframe>
                </>
            )}
            {isCybertanks && (
                <iframe src='http://localhost:3001' className="games-iframe overflow-hidden" frameBorder="0" ></iframe>
                )
            }
        </>
    );
    };
export default Game;