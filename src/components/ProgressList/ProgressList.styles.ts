import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

export const ProgressListContainer = styled(Box)({
  display: "flex",
  flexWrap: "nowrap",
  gap: "10px",
  width: "100%",
  margin: "10px",
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
