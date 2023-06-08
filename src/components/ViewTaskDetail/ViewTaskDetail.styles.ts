import { styled, alpha } from "@mui/material/styles";

export const DetailTitle = styled("h3")(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
  fontSize: "24px",
}));

export const DetailDescription = styled("p")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 400,
  fontSize: "18px",
}));

export const SubTaskWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

export const SubTask = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
}));
