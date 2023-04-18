import Header from '@/components/Header';
import Web3Provider from '@/context/Web3Provider';
import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <Header />
      <Component {...pageProps} />
    </Web3Provider>
  )
}
