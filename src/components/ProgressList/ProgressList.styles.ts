import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

export const ProgressListContainer = styled(Box)({
  display: "flex",
  flexWrap: "nowrap",
  gap: "10px",
  width: "100%",
  height: "calc(100vh - 64px)",
  boxSizing: "border-box",
});

export const Progress = styled(Box)({
  width: "300px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  textTransform: "uppercase",
});

export const ColorCircle = styled("div", {
  shouldForwardProp: (prop) => prop !== "circleColor",
})<{ circleColor?: string }>(({ theme, circleColor }) => ({
  backgroundColor: circleColor,
  width: "10px",
  height: "10px",
  borderRadius: "50%",
}));

export const NewColumn = styled(Box)(({ theme }) => ({
  minWidth: "300px",
  height: "calc(100vh - 64px)",
  backgroundColor: theme.palette.background.default,
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "22px 10px 0 0",
  cursor: "pointer",
  color: theme.palette.text.primary,
  fontSize: "18px",
}));
