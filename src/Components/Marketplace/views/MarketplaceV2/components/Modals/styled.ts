import { Button, IconButton } from '@metagg/mgg-uikit';
import styled from 'styled-components';
import { COLORS } from '../../styles/constants';

export const ModalContainer = styled.div`
  position: absolute;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
  max-width: 300px;
  boxshadow: 24;

  ${({ theme }) => `
    ${theme.mediaQueries.sm} {
      max-width: 550px;
    }

    ${theme.mediaQueries.xl} {
      max-width: 675px;
    }
  `}
`;
export const ModalSection = styled.section`
  background-color: ${COLORS.CARD};
  background: ${COLORS.GRADIENT_CARD};
  border-radius: 10px;
  border: 2px solid #5aa2cf;
  padding: 25px;
  margin-bottom: 15px;
`;

export const StyledButton = styled(Button)<{ bg?: string }>`
  width: 100%;
  height: 6vh;
  margin: 5px 0;
  border: 1px solid ${({ theme }) => theme.colors.text};
  ${props =>
    props.bg &&
    `
    background-color: ${props.bg};
  `}
`;

export const Close = styled(IconButton)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.MGG_accent2};
`;

export const Box = styled.div`
  max-width: 300px;
  margin: 5px 0;
  padding: 5px;
`;
