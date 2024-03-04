import React from 'react';
import styled from 'styled-components';
import { SocialProp } from '../../constants/config.d';
import Iconloader from '../Foundation/Iconloader';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    width: inherit;
    & > * {
        color: ${({ theme }) => theme.colors.text};
        font-size: 1.5em;
        margin: 0 5px 0 5px;
    }
`;
export default function Socials({ links }: { links: SocialProp[] }) {
    return (
        <Container>
            {links.map(link => {
                return (
                    <a
                        href={link.href}
                        key={link.name}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link with-animation-enlarge"
                    >
                        <Iconloader type={link.name === "XTwitter" ? "fa6" : "fa"} name={link.name} />
                    </a>
                );
            })}
        </Container>
    );
}
