import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("kanban/1");
  }, []);

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
    <Box sx={{ display: "flex", overflowX: "hidden", flexDirection: "column" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)`, xs: "100vw" },
          ml: { md: `${drawerWidth}px` },
          top: 0,
          backgroundColor: "background.default",
        }}
      >
        <Toolbar>
          <Topbar toggleDrawer={handleMobileDrawerToggle} />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth, xs: mobileDrawerWidth },
          flexShrink: { md: 0 },
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
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: mobileDrawerWidth,
            },
          }}
        >
          <Sidebar
            toggleDrawerMobile={handleMobileDrawerToggle}
            toggleDrawer={handleDesktopDrawerHide}
          />
        </Drawer>

        {/* Drawer for Desktop */}
        <Drawer
          variant="persistent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open={desktopOpen}
        >
          <Sidebar
            toggleDrawer={handleDesktopDrawerHide}
            toggleDrawerMobile={handleMobileDrawerToggle}
          />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { md: 1, xs: "20px 5px" },
          backgroundColor: "background.paper",
          ml: { md: `${drawerWidth}px` },
          overflowX: "auto",
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
