import { createContext, useState, useMemo, useContext } from "react";

import { ThemeProvider } from "@mui/system";
import { createTheme, Theme } from "@mui/material";
type Mode = "dark" | "light";

export const customColors = {
  purpleOne: "#635fc7",
  purpleTwo: "#a8a4ff",
  blackOne: "#000112",
  blackTwo: "#20212c",
  blackThree: "#2b2c37",
  blackFour: "#3e3f4e",
  grayOne: "#828fa3",
  grayTwo: "#E4EBFA",
  grayThree: "#f4f7fd",
  white: "#ffffff",
  redOne: "#ea5555",
  redTwo: "#ff9898",
};

export const darkTheme = {
  palette: {
    mode: "dark",
    primary: {
      main: customColors.purpleOne,
    },
    secondary: {
      main: customColors.blackOne,
    },
    error: {
      main: customColors.redOne,
    },
    background: {
      default: customColors.blackFour,
      paper: customColors.blackTwo,
    },
    action: {
      active: customColors.purpleOne,
      hover: customColors.purpleTwo,
      focus: customColors.purpleTwo,
    },
    text: {
      primary: customColors.white,
      secondary: customColors.grayOne,
      disabled: customColors.grayThree,
    },
    custom: {
      button: customColors.white,
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: customColors.blackTwo,
        },
      },
    },
  },
};

export const lightTheme = {
  palette: {
    mode: "light",
    primary: {
      main: customColors.purpleOne,
    },
    secondary: {
      main: customColors.grayTwo,
    },
    error: {
      main: customColors.redOne,
    },
    background: {
      default: customColors.white,
      paper: customColors.grayTwo,
    },
    action: {
      active: customColors.purpleOne,
      hover: customColors.purpleTwo,
      focus: customColors.purpleTwo,
    },
    text: {
      primary: customColors.blackOne,
      secondary: customColors.grayOne,
      disabled: customColors.grayThree,
    },
    custom: {
      button: customColors.grayThree,
    },
  },
  components: {
    //this is the way to override style to specific components globally
    MuiDailog: {
      styleOverrides: {
        paper: {
          backgroundColor: "red",
        },
      },
    },
  },
};

const themeSettings = (mode: string): any => {
  return mode === "dark" ? darkTheme : lightTheme;
};

const ThemeContext = createContext<Theme | null>(null);
const ThemeUpdateContext = createContext<any>(null);

export function useCustomTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

export const CustomThemeProvider = ({ children }: { children: any }) => {
  const [mode, setMode] = useState<Mode>("dark");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme: Theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={toggleMode}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};
