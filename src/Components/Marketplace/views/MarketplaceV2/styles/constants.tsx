import { POSITION } from './index.d';

export const breakpointMap: { [key: string]: number } = {
    xs: 370,
    sm: 576,
    md: 852,
    lg: 968,
    xl: 1080,
    xxl: 2000,
};

export const SCREEN_SIZE = {
    xxl: `@media screen and (min-width: ${breakpointMap.xxl}px)`,
};

// Navbar settings
export const SETTINGS_NAVBAR: { [key: string]: { [key: string]: number | string } } = {
    padding: {
        sm: 10,
        md: 20,
    },
};

export const SETTINGS_SIDEBAR: { [key: string]: { [key: string]: number | string } } = {
    size: {
        width: 60,
    },
};

// Paddings
export const PADDING: { [key: string]: { [key: string]: number } } = {
    MAIN: {
        SP: 10,
        MP: 20,
        LG: 100,
    },
    CONTAINER: {
        SP: 10,
        MP: 20,
        LG: 20,
    },
};

// Height
export const HEIGHT: { [key: string]: number } = { FOOTER: 15, MENU: 10 };

// Colors
export const DEFAULT_BORDERS = '1px solid #3898b8';
export const COLORS: { [key: string]: string } = {
    BACKGROUND: '#110217',
    MAIN: '#291e5c',
    NAV: 'rgb(41,30,92)',
    CONTAINER: '#110217',
    GRADIENT1:
        'linear-gradient(0deg, rgba(41,30,92,1) 0%, rgba(210,136,244,1) 0%, rgba(9,9,121,1) 100%)',
    CARD: 'rgb(23,28,64)',
    GRADIENT_CARD: 'linear-gradient(0deg, rgba(23,28,64,1) 0%, rgba(40,47,100,1) 100%)',
    GRADIENT_NAV:
        'linear-gradient(0deg, rgba(41,30,92,1) 0%, rgba(19,23,55,1) 0%, rgba(36,42,91,1) 100%)',
    GRADIENT_INNER: 'linear-gradient(0deg, rgba(42,38,98,1) 0%, rgba(38,3,75,1) 100%)',
    INNER: 'rgb(42,38,98)',
    MENU: '#131737',
    BORDER: '#3898b8',
};
// Margins
export const MARGIN: { [key: string]: number } = { SM: 24 };
// Font size
export const FONTSIZE: { [key: string]: string } = {
    SM: '12px',
    MD: '16px',
    XL: '20px',
    XXL: '30px',
};
// Font style
export const FONTSTYLE: { [key: string]: string } = {
    font1: 'Mustica Pro',
    font2: 'One Splice',
};

export const customSpacingProps = (type: any) => {
    const toFind = Object.entries(JSON.parse(JSON.stringify(type)));
    const res = toFind.map(f => ({
        [`${POSITION[f[0] as keyof typeof POSITION]}`]: f[1],
    }));
    const returnValue = res.map(r => {
        const spaceProp = Object.keys(r).pop();
        const spaceValue = Object.values(r).pop();
        const d = `${spaceProp}:${spaceValue};`;
        return d;
    });

    return returnValue;
};
