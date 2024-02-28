import React from 'react';
import styled from 'styled-components';

export const ContentWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & > * {
        margin: 2em 0px;
    }

    ${({ theme }) => `
    ${theme.mediaQueries.md} {
      padding: 0 5em;
    }
  `}
`;
