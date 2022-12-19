import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from './components/header'
import Footer from './components/footer'
import NextNProgress from 'nextjs-progressbar';
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
import Cookies from './components/cookies';


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <title>Natant Games</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Natant Games is a website with a relatively clean ui" />
      <meta name="keywords" content="Natant Network, Natant Games" />
      <meta name="author" content="Natant Network" />
      <meta name="application-name" content="Natant Games" />
      // og tags
      <meta property="og:title" content="Natant Games" />
      <meta property="og:description" content="Natant Games is a website with a relatively clean ui" />
      <meta property="og:image" content="https://natantgames.com/assets/LOGO.svg" />
      <meta property="og:url" content="https://unblockedhaven.games" />
      <meta property="og:site_name" content="Natant Games" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <link id="faviconico" rel="icon" href="/favicon.ico" />
      <Header />
      <Cookies />
      <Footer />
      <NextNProgress color="#9ca3af" startPosition={0.0} stopDelayMs={200} height={4} showOnShallow={true} options={{showSpinner: false}} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp