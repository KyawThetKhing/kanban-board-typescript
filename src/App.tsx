import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";

//local imports
import { CustomThemeProvider } from "./theme";
import store from "redux/store";
import { router } from "./routes";
import "./App.css";

function App() {
  return (
    <CustomThemeProvider>
      <Provider store={store}>
        {/*@ts-ignore */}
        <CssBaseline />
        <RouterProvider router={router} />
      </Provider>
    </CustomThemeProvider>
  );
}

export default App;
