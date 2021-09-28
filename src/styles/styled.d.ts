import { FlattenSimpleInterpolation, ThemedCssFunction } from 'styled-components'

export type Color = string
export interface Colors {
  white,
  black,

  text: Color,
  textHover: Color,

  bg: Color,
  bg16: Color,
  bg100: Color,
  accentBg: Color,

  accent: Color,
  disabled: Color,
  hover: Color,
  active: Color,

  red: Color,

  level1: Color,
  level1Hover: Color,
  
  level2: Color,
  level2Hover: Color,

  level3: Color,
  level3Hover: Color,

  level4: Color,
  level4Hover: Color,

  i1: Color,
  i2: Color,
  i3: Color,
  i4: Color,
  i5: Color,
  i6: Color,
  i7: Color,

  input: Color,
}

export interface Grids {
  sm: number
  md: number
  lg: number
}

declare module 'styled-components' {
  export interface DefaultTheme extends Colors {
    grids: Grids

    // media queries
    mediaWidth: {
      xs: ThemedCssFunction<DefaultTheme>
      sm: ThemedCssFunction<DefaultTheme>
      md: ThemedCssFunction<DefaultTheme>
      lg: ThemedCssFunction<DefaultTheme>
      1340: ThemedCssFunction<DefaultTheme>
      xl: ThemedCssFunction<DefaultTheme>
      wide: ThemedCssFunction<DefaultTheme>
    }

    borderRadius: string

  }
}
