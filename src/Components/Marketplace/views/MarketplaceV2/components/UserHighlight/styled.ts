import styled from 'styled-components';
import { MiniBox } from '../Foundation/Box';

export const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .user-h-actions {
    display: flex;
    align-items: center;

    // & > * {
    //   height: 30px;
    // }
  }
`;

export const CustomBox = styled(MiniBox)`
  font-size: 1em;
`;
