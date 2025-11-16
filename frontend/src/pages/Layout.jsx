import React from 'react'
import { Outlet } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
const Layout = () => {
  return (
    <div>
      <Header ></Header>
      
      <Outlet />

      <Footer ></Footer>
    </div>
  )
}

export default Layout