import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const TopbarContainer = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const TopbarTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

// Modal CSS Start Here
export const ContentContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));
