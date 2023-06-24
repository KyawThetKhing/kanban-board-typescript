import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Main = styled(Box, {
  shouldForwardProp: (prop) => prop !== "drawerWidth",
})<{ drawerWidth: number }>(({ theme, drawerWidth }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.background.paper,
  overflowX: "auto",
  width: `calc(100% - ${drawerWidth})px`,
  [theme.breakpoints.up("xs")]: {
    padding: "20px 5px",
  },
  [theme.breakpoints.up("md")]: {
    padding: "10px",
    marginLeft: `${drawerWidth}px`,
  },
}));

export const ToggleSideBarWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  width: "40px",
  height: "30px",
  background: theme.palette.primary.main,
  borderTopRightRadius: "20px",
  borderBottomRightRadius: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bottom: 10,
  left: 0,
  zIndex: 99,
}));
