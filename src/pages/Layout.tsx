import * as React from "react";
import { Outlet } from "react-router-dom";
import { AppBar, Box, CssBaseline, Drawer, Toolbar } from "@mui/material";

import Sidebar from "components/Sidebar";
import Topbar from "components/Topbar";
import { ReactComponent as ShowSidebarIcon } from "assets/icon-show-sidebar.svg";
import { ToggleSideBarWrapper } from "./Layout.styles";

const mobileDrawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function Layout(props: Props) {
  const { window } = props;
  const [drawerWidth, setDrawerWidth] = React.useState<number>(240);
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
  const [desktopOpen, setDesktopOpen] = React.useState<boolean>(true);

  const handleMobileDrawerToggle = () => {
    setMobileOpen((preveState) => !preveState);
  };

  const handleDesktopDrawerHide = () => {
    setDesktopOpen((preveState) => !preveState);
    setDrawerWidth(0);
  };

  const handleDesktopDrawerShow = () => {
    setDesktopOpen((preveState) => !preveState);
    setDrawerWidth(240);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Topbar />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth, xs: mobileDrawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        {/* Drawer for mobile */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleMobileDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: mobileDrawerWidth,
            },
          }}
        >
          <Sidebar toggleDrawer={handleMobileDrawerToggle} />
        </Drawer>

        {/* Drawer for Desktop */}
        <Drawer
          variant="persistent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open={desktopOpen}
        >
          <Sidebar toggleDrawer={handleDesktopDrawerHide} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "background.paper",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
      {!desktopOpen && (
        <ToggleSideBarWrapper onClick={handleDesktopDrawerShow}>
          <ShowSidebarIcon fill="#ffffff" />
        </ToggleSideBarWrapper>
      )}
    </Box>
  );
}
