import React from 'react';
import styled from 'styled-components';
import { Flex } from '@metagg/mgg-uikit';
import { MiniBox } from '../Box';
import { P, TextWrapper } from '../Text';

type Props = {
    [key: string]: string;
};

const Field = (props: Props) => {
    const title = Object.keys(props)[0];
    const description = Object.values(props)[0];
    return (
        <FieldWrapper>
            <Flex justifyContent="space-between" style={{ width: '100%' }}>
                <TextWrapper>
                    <P fsize="0.6em">{title}</P>
                </TextWrapper>
                <TextWrapper>
                    <P fsize="0.6em">{description}</P>
                </TextWrapper>
            </Flex>
        </FieldWrapper>
    );
};

export default Field;

const FieldWrapper = styled(MiniBox)`
    width: 100%;
    padding: 5px;
`;
