import React from 'react';
import {
    AccordionDetails,
    AccordionSummary,
    Accordion as MUIAccordion,
} from '@mui/material';
import { ChevronDown } from 'react-feather';
import useTheme from '../../../../../hooks/useTheme';
import { Props } from './index.d';
import { H1, P } from '../Text';

const Accordion: React.FC<{ children: any; name: string }> = ({ children, ...props }) => {
    const { name } = props;
    const { theme } = useTheme();

    return (
        <MUIAccordion sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
            <AccordionSummary
                expandIcon={<ChevronDown color={theme!.colors.MGG_accent2} />}
                aria-controls={`${name.toLowerCase()}-content`}
                id={`${name.toLowerCase()}-header`}
                sx={{ borderBottom: `1px solid ${theme!.colors.MGG_accent2}` }}
            >
                <H1>{name}</H1>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </MUIAccordion>
    );
};

export default Accordion;
