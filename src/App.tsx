import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider } from "react-router-dom";

//local imports
import { CustomThemeProvider } from "theme/theme";
import store from "redux/store";
import { router } from "./routes";

function App() {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </CustomThemeProvider>
  );
}

export default App;
