import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const ButtonRounded = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.primary.main,
  borderRadius: "20px",
  padding: "10px 30px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark, // Set the hover background color
  },
}));
