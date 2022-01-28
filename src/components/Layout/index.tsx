import GlobalNav from '../GlobalNav'
import Head from '../Head'
import SideNav from '../SideNav'
import { ReactNode } from 'react'

type Props = {
    children: ReactNode;
}

export const Layout = ({ children }:Props) => {
  return (
    <>
      <Head />
      <GlobalNav />
      <div className="bg-gray-100 w-full h-screen">
        <div className="max-w-7xl mx-auto pt-5 px-2 sm:px-6 lg:px-8 flex">
          <SideNav />
          {children}
        </div>
      </div>
    </>
  )
}