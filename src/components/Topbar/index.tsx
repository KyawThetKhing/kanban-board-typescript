import { useState } from "react";
import { Dialog, DialogContent, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//local imports
import { TopbarTitle, TopbarContainer } from "./Topbar.styles";
import { AddTaskForm } from "../TaskForm";
import { selectKanbanBoardById } from "redux/kanban/kanbanSelectors";

const Topbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { kanbanId } = useParams();
  const kanbanDetail = useSelector(selectKanbanBoardById(kanbanId || ""));

  return (
    <TopbarContainer>
      <TopbarTitle variant="h5">{kanbanDetail.title}</TopbarTitle>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        sx={{
          borderRadius: "20px",
        }}
      >
        + Add New Task
      </Button>

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
