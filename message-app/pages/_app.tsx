import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { GlobalStateProvider } from '../GlobalStateContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalStateProvider>
<Component {...pageProps} />)
    </GlobalStateProvider>
  )
}

export default MyApp
