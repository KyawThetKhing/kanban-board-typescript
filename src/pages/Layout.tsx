import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box } from "@mui/material";

import Sidebar from "components/Sidebar";
import Topbar from "components/Topbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Grid
      container
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Grid xs={2} sx={{ backgroundColor: "red" }}>
        <Sidebar />
      </Grid>
      <Grid xs={10}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Topbar />
          <Box
            sx={{
              backgroundColor: "background.paper",
              width: "100%",
              height: "100%",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Layout;
