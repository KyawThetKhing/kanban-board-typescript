import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

export const TaskListContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "100%",
  height: "100%",
}));

export const TaskWrapper = styled(Box)(({ theme }) => ({
  padding: "10px",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.background.default,
  cursor: "pointer",
}));
