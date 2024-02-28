import '../../styles/globals.css';
import '../../styles/Home.css';
import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { PageContainer, StyledSection } from './components/Foundation/layout';
import * as SECTIONS from './components/Sections';
import { HERO, FEATURED, SHOWCASE } from './components/Sections';
import ViewsLayout from './components/Foundation/layout/Views';
import MarketplaceProviders from './Providers';
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
            {/* {Object.keys(sections).map((key) => {
        const Sec = sections[key] as React.FC
        return (
          <StyledSection key={key}>
            <PageContainer>
              <Sec />
            </PageContainer>
          </StyledSection>
        )
      })} */}
            {/* <StyledSection>
        <PageContainer>
          <HERO />
        </PageContainer>
      </StyledSection>
      <StyledSection>
        <PageContainer>
          <SHOWCASE />
        </PageContainer>
      </StyledSection>
      <StyledSection>
        <PageContainer>
          <FEATURED />
        </PageContainer>
      </StyledSection> */}
            <HERO />
            <SHOWCASE />
            <FEATURED />
        </ViewsLayout>
    );
};

export default MarketplaceV2;
