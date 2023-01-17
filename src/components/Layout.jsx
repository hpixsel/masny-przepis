import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout({children}) {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Navbar />
        <div className=''>
          {children}
        </div>
      <Footer />
    </div>
    </>
  )
}
