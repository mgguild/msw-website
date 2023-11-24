import styled from 'styled-components';

export const ButtonGlitch = styled.button<{ signed?: any }>`
    min-width: 7.8rem;
    max-width: 26rem;
    height: 3rem;
    padding: 0 1rem;
    background: linear-gradient(45deg, transparent 5%, #e63525 5%);
    border: 0;
    color: #fff;
    letter-spacing: 2.5px;
    box-shadow: 1rem 0px 0px ${({ signed }) => (signed ? '#00ffe1' : '#303030')};
    outline: transparent;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    position: relative;
    z-index: 5;
`;

export const SectHdr = styled.div`
    display: flex;
    justify-content: center;
    margin: 1.5rem;
`;

export const TitleCard = styled.div<{ padding?: string }>`
    position: relative;
    align-items: center;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: rgba(255, 255, 255, 0);
    -webkit-background-clip: border-box;
    background-clip: border-box;
    padding: ${({ padding }) => padding ?? `2rem 4rem`};
    border: 0rem solid rgba(0, 0, 0, 0.125);
    border-radius: 0rem;
    background-image: url(${require('../../Assets/img/tiles.png')});
    background-size: cover;
    background-position: center;

    @media (max-width: 721px) {
        padding: 3rem 5rem !important;

        h1 {
            font-size: 2.4rem !important;
        }
    }

    @media (max-width: 440px) {
        padding: 3rem 5rem !important;
        h1 {
            font-size: 2.4rem !important;
        }
    }
`;

export const SectCont = styled.div<{
    margin?: string;
    maxWidth?: string;
    minHeight?: string;
    justifyContent?: string;
    display?: string;
}>`
    margin: ${({ margin }) => margin ?? `8rem`};
    max-width: ${({ maxWidth }) => maxWidth ?? `none`};
    justify-content: ${({ justifyContent }) => justifyContent ?? `none`};
    min-height: ${({ minHeight }) => minHeight ?? '30rem'};
    display: ${({ display }) => display ?? 'flex'};
    gap: 1rem;
`;
