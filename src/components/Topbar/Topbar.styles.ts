import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

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

export const AddTaskBtn = styled(Button)(({ theme }) => ({
  borderRadius: "20px",
  color: theme.palette.common.white,
  backgroudColor: "theme.palette.primary.main",
  padding: "10px 20px",
  "&:hover": {
    backgroudColor: theme.palette.primary.light,
  },
  [theme.breakpoints.up("xs")]: {
    display: "none",
  },
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
}));

export const AddTaskBtnMobile = styled(Button)(({ theme }) => ({
  borderRadius: "20px",
  color: theme.palette.common.white,
  backgroudColor: theme.palette.primary.main,
  padding: "10px 20px",
  "&:hover": {
    backgroudColor: theme.palette.primary.light,
  },
  [theme.breakpoints.up("xs")]: {
    display: "block",
  },
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));
