import { styled } from "@mui/material/styles";

export const Container = styled("div")(({ theme }) => ({
  background: theme.palette.background.default,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "10px",
  padding: 0,
}));

export const RouteContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

export const RouteTitle = styled("div")(({ theme }) => ({
  color: theme.palette.text.primary,
  padding: "10px",
}));

export const ListContainer = styled("ul")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "100%",
  padding: "0px",
}));

export const List = styled("li")(({ theme }) => ({
  listStyle: "none",
  width: "100%",
}));

export const Footer = styled("div")(({ theme }) => ({
  width: "100%",
  padding: "0 10px",
}));

export const ThemeContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
  padding: "5px 10px",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.secondary.main,
}));

export const SidebarToggle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "10px",
  width: "100%",
  marginTop: "20px",
  cursor: "pointer",
}));
