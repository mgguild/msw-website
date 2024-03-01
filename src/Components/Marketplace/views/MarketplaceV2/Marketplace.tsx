import "../../styles/globals.css";
import "../../styles/Home.css";
import React, { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { PageContainer, StyledSection } from './components/Foundation/layout'
import * as SECTIONS from './components/Sections'
import { HERO, FEATURED, SHOWCASE } from "./components/Sections"
import ViewsLayout from './components/Foundation/layout/Views'
import MarketplaceProviders from './Providers'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import Authentication from './components/Authentication'

const sections = SECTIONS as unknown as { [key: string]: React.FC };

const MarketplaceV2: React.FC = () => {
    useEffect(() => {
        Aos.init({
            duration: 2000,
        });
    }, []);

  return (
    <ViewsLayout>
      <Navbar />
      <HERO />
      <SHOWCASE />
      <FEATURED />
      <Footer />
    </ViewsLayout>
  )
}

export default MarketplaceV2;
