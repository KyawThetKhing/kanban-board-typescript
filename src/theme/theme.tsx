import { createContext, useState, useMemo, useContext, ReactNode } from "react";

import { ThemeProvider } from "@mui/system";
import { createTheme, Theme } from "@mui/material";

import { lightTheme } from "./lightTheme";
import { darkTheme } from "./darkTheme";

type Mode = "dark" | "light";

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

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
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
