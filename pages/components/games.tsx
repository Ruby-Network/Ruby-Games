import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export async function getServerSideProps() {
  const tiles = [
    {props: {
      image: '',
      link: '',
      title: '',
      proxy: ''
    }}
  ];
  return {  props: { tiles } };
}


const Tiles= (props: { tiles: any[]; }) => {
  const router = useRouter();
  const [isList, setIsList] = useState(false);
  const [showButton, setShowButton] = useState(true);
  if (router.isReady) {
    useEffect(() => {
      if (localStorage.getItem('isList') === 'true') {
        setIsList(true);
      } else {
        setIsList(false);
      }
      if (typeof window !== 'undefined') {
        if (window.innerWidth <= 768) {
          setIsList(true)
          localStorage.setItem('isList', 'true')
          setShowButton(false)
        }
      }
    }, [router.isReady]);
  }
  // detect is the user is on mobile or desktop
  return (
    <>
      {!isList && (
        <>
          {/* <button onClick={() => {setIsList(true)}} className="w-20 text-gray-400 hover:text-gray-200 rounded-full px-3 py-2 border-2 border-gray-400 cursor-pointer block mt-4 mb-5 text-center">List</button> */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {setIsList(true), localStorage.setItem('isList', 'true')}}
            className="w-20 text-gray-400 hover:text-gray-200 rounded-full px-3 py-2 border-2 border-gray-400 cursor-pointer block mt-4 mb-5 text-center"
          >
            List
          </motion.button>
          <h1 className="text-white font-bold text-center">Credit to <a href='https://3kh0.github.io/' target='_blank' rel="noopener" className="text-blue-500 cursor-pointer mb-20">Echo</a> for some of the games!</h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
          <div className="grid grid-cols-4 gap-4">
          {props.tiles.map((tile, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow-md shadow-gray-400 p-4">
              {/* <img onClick={() => {router.replace(tile.link+'&game='+tile.title)}} alt="Image" src={tile.image} className="w-80 h-40 object-cover object-center" /> */}
              <motion.img
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.9 }}
                src={tile.image}
                alt={tile.title}
                className="w-80 h-40 object-cover object-center cursor-pointer"
                onClick = {() => {router.replace(tile.link+'&game='+tile.title)}}
              />
              <p className="block mt-4 text-white text-center">{tile.title}</p>
              <button onClick={() => {router.replace(tile.link+'&game='+tile.title)}} className="w-20 text-gray-400 hover:text-gray-200 rounded-full px-3 py-2 border-2 border-gray-400 cursor-pointer block mt-4 text-center">Play</button>
            </div>
          ))}
        </div>
        </motion.div>
      </>
      )}
      {isList && (
        <>
          {/* <button onClick={() => {setIsList(false)}} className="w-20 text-gray-400 hover:text-gray-200 rounded-full px-3 py-2 border-2 border-gray-400 cursor-pointer block mt-4 text-center">Grid</button> */}
          {showButton &&
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {setIsList(false), localStorage.setItem('isList', 'false')}}
              className="w-20 text-gray-400 hover:text-gray-200 rounded-full px-3 py-2 border-2 border-gray-400 cursor-pointer block mt-4 mb-5 text-center"
            >
              Grid
            </motion.button>
          }
          <h1 className="text-white font-bold text-center">Credit to <a href='https://3kh0.github.io/' target='_blank' rel="noopener" className="text-blue-500 cursor-pointer mb-20">Echo</a> for some of the games!</h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
          <div className="grid grid-cols-1 gap-4">
          {props.tiles.map((tile, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow-md shadow-gray-400 p-4">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <motion.img
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.9 }}
                    src={tile.image}
                    alt={tile.title}
                    className="w-80 h-40 object-cover object-center cursor-pointer"
                    onClick = {() => {router.replace(tile.link+'&game='+tile.title)}}
                  />
                </div>
                <div className="md:w-2/3">
                  <p className="block mt-4 text-white text-center md:text-left">{tile.title}</p>
                  <button onClick={() => {router.replace(tile.link+'&game='+tile.title)}} className="w-20 text-gray-400 hover:text-gray-200 rounded-full px-3 py-2 border-2 border-gray-400 cursor-pointer block mt-4 text-center">Play</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </motion.div>
        </>
      )}
    </>
  );
};
export default Tiles;
