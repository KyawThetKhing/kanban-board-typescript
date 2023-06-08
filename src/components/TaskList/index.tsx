import React, { useState } from "react";
import { Box, Menu, MenuItem, Dialog, DialogContent } from "@mui/material";
import { useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";

//local imports
import { selectTasksByColumnId } from "redux/kanban/kanbanSelectors";
import { TaskListContainer, TaskWrapper } from "./TaskList.styles";
import { ITask } from "redux/kanban/kanban.types";
import { AddTaskForm } from "../AddTaskForm";
import { ViewTaskDetail } from "../ViewTaskDetail";

const TaskList = ({ columnId }: { columnId: string | null }) => {
  console.log("Column ID", columnId);
  const taskList = useSelector(selectTasksByColumnId(columnId || ""));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openEditDailog, setOpenEditDialog] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>("");
  const handleEditOpen = () => setOpenEditDialog(true);
  const handleEditClose = () => setOpenEditDialog(false);

  const [openViewDailog, setOpenViewDialog] = useState<boolean>(false);
  const [task, setTask] = useState<ITask | null>(null);
  const handleViewOpen = () => setOpenViewDialog(true);
  const handleViewClose = () => setOpenViewDialog(false);

  const handleClick = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleViewTask = (task: ITask) => {
    console.log("Task", task);
    setTask(task);
    handleViewOpen();
    setAnchorEl(null);
  };

  const handleEditTask = (taskId: string) => {
    setTaskId(taskId);
    handleEditOpen();
    setAnchorEl(null);
  };

  return (
    <TaskListContainer>
      {taskList?.map((task: ITask) => (
        <TaskWrapper key={task.title}>
          <Box>{task.title}</Box>
          <Box>{task.description}</Box>
          <Box
            onClick={handleClick}
            sx={{ position: "absolute", right: 0, top: "8px" }}
          >
            <MoreVertIcon />
          </Box>

          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={() => handleViewTask(task)}>View</MenuItem>
            <MenuItem onClick={() => handleEditTask(task.id)}>Edit</MenuItem>
          </Menu>
        </TaskWrapper>
      ))}
      {/**Edit Task Modal */}
      <Dialog
        open={openEditDailog}
        onClose={handleEditClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent>
          <AddTaskForm handleClose={handleEditClose} taskId={taskId} />
        </DialogContent>
      </Dialog>

      {/**Edit Task Modal */}
      <Dialog
        open={openViewDailog}
        onClose={handleViewClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent>
          <ViewTaskDetail handleClose={handleViewClose} task={task} />
        </DialogContent>
      </Dialog>
    </TaskListContainer>
  );
};

export default TaskList;
