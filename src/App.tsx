import { Box, ThemeProvider } from "@mui/system";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

//local imports
import Topbar from "components/Topbar/Topbar";
import { useMode, ColorModeContext } from "./theme";
import { router } from "./routes";
import store from "redux/store";
import "./App.css";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <Provider store={store}>
      {/*@ts-ignore */}
      <ColorModeContext.Provider value={colorMode}>
        {/*@ts-ignore */}
        <ThemeProvider theme={theme}>
          <Box>
            <Topbar />
            <RouterProvider router={router} />
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  );
}

export default App;
