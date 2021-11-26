import { rgba } from 'polished'
import React, { useMemo } from 'react'
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  css,
  DefaultTheme
} from 'styled-components'
import { Colors } from './styled'


//--- MEDIA QUERIES ---//
const MEDIA_WIDTHS = {
  xs: 360,
  sm: 660,
  md: 1024,
  lg: 1200,
  1340: 1340,
  xl: 1500,
  wide: 2000
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ; (accumulator as any)[size] = (a: any, b: any, c: any) => 
        css`
        @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
          ${css(a, b, c)}
        }
      `
    return accumulator
  },
  {}
) as any


//--- COLORS ---//
const white = '#FFFFFF'
const black = '#000000'

export function colors(darkMode: boolean): Colors {
  return {
    white,
    black,

    text: "#FFFEF8",
    textHover: "#ef8689",

    bg: "#263143",
    bg16: "#191F2A",
    bg100: "#EBF3FF",
    accentBg: "#efd8d9",

    accent: "#EF4950",
    disabled: "#C4BFBF",
    hover: "#d9434b",
    active: "#bf3b42",

    red: "#C64343",

    level1: "#BEDD56",
    level1Hover: "#b8e81c",
    level1Active: "#607713",

    level2: "#DDAE56",
    level2Hover: "#e89a1c",
    level2Active: "#785113",

    level3: "#DD7A56",
    level3Hover: "#ba6749",
    level3Active: "",
    
    level4: "#DD5656",
    level4Hover: "#ba4949",
    level4Active: "",

    i1: "#BEA5E6",
    i2: "#7F59E5",
    i3: "#71BBC9",
    i4: "#88E0BA",
    i5: "#4F6D81",
    i6: "#A4F49E",
    i7: "#D6E871",

    input: "#D3DAE5",
  }
}

//--- THEME ---//

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24
    },

    // media queries
    mediaWidth: mediaWidthTemplates,

    borderRadius: "5px",
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  //const darkMode = useIsDarkMode()
  const darkMode = true

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}