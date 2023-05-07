import { createContext, useState, useMemo } from "react";
import { createTheme, colors } from "@mui/material";

//mui theme settings
export const themeSettings = (mode: "dark" | "light") => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.grey[900],
            },
            secondary: {
              main: colors.indigo[700],
            },
            background: {
              default: colors.grey[900],
            },
          }
        : {
            primary: {
              main: "#ffffff",
            },
            secondary: {
              main: colors.deepPurple[500],
            },
            background: {
              default: colors.grey[100],
            },
          }),
    },
  };
};

//context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState<"dark" | "light">("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
