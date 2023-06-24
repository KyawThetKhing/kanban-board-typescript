import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

export const TaskListContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "100%",
  height: "100%",
}));

export const TaskWrapper = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "isDragging" && prop !== "isDraggingOver",
})<{ isDragging: boolean; isDraggingOver: boolean }>(
  ({ theme, isDragging, isDraggingOver }) => ({
    padding: "10px",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    userSelect: "none",
    minHeight: "50px",
    position: "relative",
    backgroundColor:
      isDragging || isDraggingOver
        ? theme.palette.background.paper
        : theme.palette.background.default,
  })
);

export const TaskTitle = styled(Box)(({ theme }) => ({
  width: "90%",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontSize: "18px",
  fontWeight: theme.typography.fontWeightBold,
}));
