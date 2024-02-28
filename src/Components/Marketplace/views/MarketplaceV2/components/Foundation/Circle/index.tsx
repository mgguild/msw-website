import React from 'react';
import styled from 'styled-components';

const Circle = ({ color }: { color?: string }) => {
    return <StyledCircle color={color} />;
};

export default Circle;

const StyledCircle = styled.div<{ color?: string; size?: string }>`
    ${props => `
background-color: ${props.color}; 
width: ${props.size ?? '0.8em'};
height: ${props.size ?? '0.8em'};
border-radius: 50%;
margin: 0px 2px;
`}
`;

Circle.defaultProps = {
    color: '',
};
