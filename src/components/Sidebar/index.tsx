import { Box } from "@mui/system";
import { Switch, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

import { ReactComponent as DarkLogoIcon } from "assets/logo-dark.svg";
import { ReactComponent as LightLogoIcon } from "assets/logo-light.svg";
import { ReactComponent as SidebarIcon } from "assets/icon-board.svg";
import { ReactComponent as DarkThemeIcon } from "assets/icon-dark-theme.svg";
import { ReactComponent as LightThemeIcon } from "assets/icon-light-theme.svg";
import { ReactComponent as HideSidebarIcon } from "assets/icon-hide-sidebar.svg";

import {
  Container,
  RouteContainer,
  RouteTitle,
  ListContainer,
  List,
  Footer,
  ThemeContainer,
  SidebarToggle,
} from "./index.styles";
import { useCustomTheme, useThemeUpdate } from "./../../theme";
const Sidebar = () => {
  const theme = useCustomTheme();
  const toggleMode = useThemeUpdate();

  //@ts-ignore
  return (
    <Container>
      <RouteContainer>
        <Box
          sx={{
            padding: "20px 10px",
          }}
        >
          {theme?.palette.mode === "dark" ? (
            <LightLogoIcon />
          ) : (
            <DarkLogoIcon />
          )}
        </Box>
        <RouteTitle>All Board(3)</RouteTitle>
        <ListContainer>
          <List>
            <NavLink
              to="/platform-launch"
              style={({ isActive }) => {
                return {
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "10px",
                  textDecoration: "none",
                  borderTopRightRadius: "20px",
                  padding: "10px",
                  borderBottomRightRadius: "20px",
                  fontWeight: isActive ? "bold" : "",
                  backgroundColor: isActive ? "#635fc7" : "inherit",
                };
              }}
            >
              <SidebarIcon />
              <Box
                sx={{
                  color: "text.primary",
                }}
              >
                Platform Launch
              </Box>
            </NavLink>
          </List>
          <List>
            <NavLink
              to="/marketing-plan"
              style={({ isActive }) => {
                return {
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "10px",
                  textDecoration: "none",
                  borderTopRightRadius: "20px",
                  padding: "10px",
                  borderBottomRightRadius: "20px",
                  fontWeight: isActive ? "bold" : "",
                  backgroundColor: isActive ? "#635fc7" : "inherit",
                };
              }}
            >
              <SidebarIcon />
              <Box
                sx={{
                  color: "text.primary",
                }}
              >
                Marketing Plan
              </Box>
            </NavLink>
          </List>
          <List>
            <NavLink
              to="/roadmap"
              style={({ isActive }) => {
                return {
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "10px",
                  textDecoration: "none",
                  borderTopRightRadius: "20px",
                  padding: "10px",
                  borderBottomRightRadius: "20px",
                  fontWeight: isActive ? "bold" : "",
                  backgroundColor: isActive ? "#635fc7" : "inherit",
                };
              }}
            >
              <SidebarIcon />
              <Box
                sx={{
                  color: "text.primary",
                }}
              >
                Roadmap
              </Box>
            </NavLink>
          </List>
        </ListContainer>
      </RouteContainer>
      <Footer>
        <ThemeContainer>
          <LightThemeIcon />
          <Switch
            checked={theme?.palette.mode === "dark"}
            color="primary"
            onChange={toggleMode}
            inputProps={{ "aria-label": "controlled" }}
          />
          <DarkThemeIcon />
        </ThemeContainer>
        <SidebarToggle>
          <HideSidebarIcon />
          <Typography>Hide Sidebar</Typography>
        </SidebarToggle>
      </Footer>
    </Container>
  );
};

export default Sidebar;
