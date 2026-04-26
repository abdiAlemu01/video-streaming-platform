import 'styled-components';

// Extend the DefaultTheme interface for styled-components
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        red: string;
        darkRed: string;
        black: string;
        darkGray: string;
        gray: string;
        lightGray: string;
        white: string;
      };
      secondary: {
        blue: string;
        green: string;
        yellow: string;
        orange: string;
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
        inverse: string;
      };
      background: {
        primary: string;
        secondary: string;
        tertiary: string;
        overlay: string;
        modal: string;
      };
      border: {
        primary: string;
        secondary: string;
        focus: string;
      };
      status: {
        success: string;
        warning: string;
        error: string;
        info: string;
      };
    };
    typography: {
      fontFamily: {
        primary: string;
        secondary: string;
      };
      fontSize: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
        '5xl': string;
      };
      fontWeight: {
        light: number;
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
      };
      lineHeight: {
        tight: number;
        normal: number;
        relaxed: number;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
      wide: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      card: string;
      modal: string;
    };
    borderRadius: {
      none: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      full: string;
    };
    zIndex: {
      dropdown: number;
      sticky: number;
      fixed: number;
      modal: number;
      popover: number;
      tooltip: number;
    };
    transitions: {
      fast: string;
      normal: string;
      slow: string;
      easing: {
        easeInOut: string;
        easeOut: string;
        easeIn: string;
      };
    };
  }
}

// Additional styled-components utility types
export type StyledProps<T = {}> = T & {
  theme: DefaultTheme;
};

export type ResponsiveValue<T> = T | T[];

export interface MediaQueries {
  mobile: string;
  tablet: string;
  desktop: string;
  wide: string;
}

export interface ThemeProviderProps {
  theme: DefaultTheme;
  children: React.ReactNode;
}