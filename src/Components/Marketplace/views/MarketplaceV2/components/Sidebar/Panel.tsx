import React from 'react';
import { StyledPanel, StyledPanelBody, StyledPanelFooter } from './styled';
import { Props } from './index.d';
import Navbutton from './Navbutton';
import Iconloader from '../Foundation/Iconloader';

const Panel: React.FC<{ links: Props }> = props => {
    const { links } = props;
    return (
        <StyledPanel className="sidebar-container nav-drop-shadow">
            <StyledPanelBody className="sidebar-nav">
                {links.map(link => {
                    return (
                        <Navbutton key={link.name} href={link.href} className="link">
                            <Iconloader
                                type="fa"
                                name={link.name}
                                className="with-animation-enlarge"
                            />
                        </Navbutton>
                    );
                })}
            </StyledPanelBody>
            {/* <StyledPanelFooter className="sidebar-footer">
        <Navbutton href="/help" className="link" target="_blank" rel="noopener noreferrer">
          <Iconloader type="fa" name="ExclamationCircle" className="with-animation-enlarge" />
        </Navbutton>
      </StyledPanelFooter> */}
        </StyledPanel>
    );
};

export default Panel;
