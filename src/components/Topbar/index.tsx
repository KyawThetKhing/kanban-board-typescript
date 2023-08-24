import { useState } from "react";
import { Dialog, DialogContent, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//local imports
import {
  TopbarTitle,
  TopbarContainer,
  AddTaskBtn,
  AddTaskBtnMobile,
} from "./Topbar.styles";
import { AddTaskForm } from "../TaskForm";
import { selectKanbanBoardById } from "redux/kanban/kanbanSelectors";
import { ReactComponent as Logo } from "assets/logo-mobile.svg";
import { TopbarProps } from "./Topbar.types";

const Topbar = ({ toggleDrawer }: TopbarProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { kanbanId } = useParams();
  const kanbanDetail = useSelector(selectKanbanBoardById(kanbanId || ""));

  return (
    <TopbarContainer>
      <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <Box
          sx={{
            display: { md: "none", xs: "flex" },
            alignItems: "center",
          }}
          onClick={toggleDrawer}
        >
          <Logo width="30px" height="20px" />
        </Box>
        <TopbarTitle variant="h5">{kanbanDetail?.title}</TopbarTitle>
      </Box>
      <AddTaskBtn onClick={handleOpen} variant="contained">
        + Add New Task
      </AddTaskBtn>

      <AddTaskBtnMobile onClick={handleOpen} variant="contained">
        +
      </AddTaskBtnMobile>

      {/**Add Task Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogContent>
          <AddTaskForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </TopbarContainer>
  );
};

export default Topbar;
