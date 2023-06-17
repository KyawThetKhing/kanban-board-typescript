import React, { useState } from "react";
import { Box, Menu, MenuItem, Dialog, DialogContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";

//local imports
import { selectTasksByColumnId } from "redux/kanban/kanbanSelectors";
import { TaskListContainer, TaskWrapper } from "./TaskList.styles";
import { ITask } from "redux/kanban/kanban.types";
import { AddTaskForm } from "../TaskForm";
import { ViewTaskDetail } from "../ViewTaskDetail";
import { deleteTask } from "redux/kanban/kanbanSlice";
import WarningDialog from "../WarningDialog";

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

  const [openWarningDailog, setOpenWarningDialog] = useState<boolean>(false);
  const [taskIdForWarning, setTaskIdForWarning] = useState<string>("");
  const handleWarningOpen = (taskId: string) => {
    setTaskIdForWarning(taskId);
    setOpenWarningDialog(true);
    setAnchorEl(null);
  };
  const handleWarningClose = () => setOpenWarningDialog(false);

  const dispatch = useDispatch();

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

  const handleDeleteTask = () => {
    console.log("Warning Task Id", taskIdForWarning);
    if (!taskIdForWarning) return;
    dispatch(deleteTask(taskIdForWarning));
    setOpenWarningDialog(false);
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
            <MenuItem onClick={() => handleWarningOpen(task.id)}>
              Delete
            </MenuItem>
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

      {/**Warning Dialog */}
      <WarningDialog
        openDialog={openWarningDailog}
        title="Delete this task?"
        description="Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed."
        cancelBtnText="Cancel"
        confirmBtnText="Delete"
        handleConfirm={handleDeleteTask}
        handleCancel={handleWarningClose}
      />
    </TaskListContainer>
  );
};

export default TaskList;
