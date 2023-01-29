import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer' 

const Layout = ({children}) => {
  return (
    <div className='layout'>
      <Head>
        <title>Z Store</title>
        <meta httpEquiv="Content-Security-Policy" content="font-src 'self' https://*.jsdelivr.net"></meta>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='main-container'>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout