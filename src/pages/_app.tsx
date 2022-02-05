import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

import { Header } from '../components/Header'

import '../styles/global.scss' 
import { TIME_FOR_REVALIDATE_AUTH } from '../const/const'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <SessionProvider 
      session={pageProps.session} 
      refetchInterval={TIME_FOR_REVALIDATE_AUTH}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
