import { useState } from "react";
import { Dialog, DialogContent, Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//local imports
import { TopbarTitle, TopbarContainer } from "./Topbar.styles";
import { AddTaskForm } from "../TaskForm";
import { selectKanbanBoardById } from "redux/kanban/kanbanSelectors";
import { ReactComponent as Logo } from "assets/logo-mobile.svg";

const Topbar = ({ toggleDrawer }: { toggleDrawer?: () => void }) => {
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
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        sx={{
          borderRadius: "20px",
          display: { sm: "block", xs: "none" },
        }}
      >
        + Add New Task
      </Button>

      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        sx={{
          borderRadius: "20px",
          display: { sm: "none", xs: "block" },
        }}
      >
        +
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
