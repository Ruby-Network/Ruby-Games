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