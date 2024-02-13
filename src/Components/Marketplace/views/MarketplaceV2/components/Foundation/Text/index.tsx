import styled from 'styled-components'
import { customSpacingProps, FONTSIZE, SCREEN_SIZE } from '../../../../../views/MarketplaceV2/styles/constants'
import { WrapperProps, TextProps } from './index.d'

export const TextWrapper = styled.div<WrapperProps>`
  font-size: ${FONTSIZE.SM};
  color: ${({ theme }) => theme.colors.text};
  line-height: ${({ lineHeight }) => `${lineHeight ?? '1em'}`};
  ${({ align }) =>
    align &&
    `
      text-align: ${align};
    `}
  ${({ p, pt, pb, pl, pr }) => customSpacingProps({ p, pt, pb, pl, pr })}
  ${({ m, mt, mb, ml, mr }) => customSpacingProps({ m, mt, mb, ml, mr })}
  ${({ theme }) => `
    ${theme.mediaQueries.sm} {
      font-size: ${FONTSIZE.MD};
    }
    ${theme.mediaQueries.md} {
      font-size: ${FONTSIZE.MD};
    }
    ${theme.mediaQueries.xl} {
      font-size: ${FONTSIZE.XL};
    }
  `}
  ${SCREEN_SIZE.xxl} {
    font-size: ${FONTSIZE.XXL};
  }
`

const CommonFontProp = styled.div<TextProps>`
  ${(props) => `
    font-size: ${props.fsize ?? '1em'};
    color: ${props.color ?? props.theme.colors.text};
  `}
  ${({ fstyle }) =>
    fstyle &&
    `
    font-family: ${fstyle};
  `}
  ${({ weight }) => weight && `font-weight: ${weight}`};

  ${({ p, pt, pb, pl, pr }) => customSpacingProps({ p, pt, pb, pl, pr })}
  ${({ m, mt, mb, ml, mr }) => customSpacingProps({ m, mt, mb, ml, mr })}
`

export const H6 = styled(CommonFontProp).attrs({ as: 'h2' })<TextProps>``
export const H5 = styled(CommonFontProp).attrs({ as: 'h2' })<TextProps>``
export const H4 = styled(CommonFontProp).attrs({ as: 'h4' })<TextProps>``
export const H3 = styled(CommonFontProp).attrs({ as: 'h2' })<TextProps>``
export const H2 = styled(CommonFontProp).attrs({ as: 'h2' })<TextProps>``
export const H1 = styled(CommonFontProp).attrs({ as: 'h1' })<TextProps>``
export const P = styled(CommonFontProp).attrs({ as: 'p' })<TextProps>``

// scrapped
// ${({ p, pt, pb, pl, pr }) => `
// ${
//   p &&
//   `
//  padding: ${p};
// `
// }
// ${
//   pt &&
//   `
//   padding-top: ${pt};
// `
// }
// ${
//   pb &&
//   `
//   padding-bottom: ${pb};
// `
// }
// ${
//   pl &&
//   `
//   padding-left: ${pl};
// `
// }
// ${
//   pr &&
//   `
//   padding-right: ${pr};
// `
// }
// `}
