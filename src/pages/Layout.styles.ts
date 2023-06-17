import { styled } from "@mui/system";

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
