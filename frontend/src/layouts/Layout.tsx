import React from 'react';
import Header from '../components/Header';
import Title from '../components/Title'
import Footer from '../components/Footer';


interface Props{
 children:React.ReactNode,
}



const Layout = ({ children }:Props) => {
    return (
        <div className="flex flex-col min-h-screen">
          <Header />
          <Title />

          <div className="container mx-auto py-10 flex-1">{children}</div>
          <Footer />
        </div>
      );
}

export default Layout ;