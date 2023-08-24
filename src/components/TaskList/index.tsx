import React, { useState } from "react";
import { Box, Menu, MenuItem, Dialog, DialogContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Draggable } from "react-beautiful-dnd";

//local imports
import { selectTasksByColumnId } from "redux/kanban/kanbanSelectors";
import { TaskListContainer, TaskWrapper, TaskTitle } from "./TaskList.styles";
import { ITask } from "redux/kanban/kanban.types";
import { AddTaskForm } from "../TaskForm";
import { ViewTaskDetail } from "../ViewTaskDetail";
import { deleteTask } from "redux/kanban/kanbanSlice";
import WarningDialog from "../WarningDialog";
import { TaskListProps } from "./TaskList.types";

const TaskList = ({
  columnId,
  isDraggingOver,
}: TaskListProps) => {
  const taskList = useSelector(selectTasksByColumnId(columnId || ""));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [selectTaskId, setSelectTaskId] = useState<string>("");

  const [openEditDailog, setOpenEditDialog] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>("");
  const handleEditOpen = () => setOpenEditDialog(true);
  const handleEditClose = () => setOpenEditDialog(false);

  const [openViewDailog, setOpenViewDialog] = useState<boolean>(false);
  const [viewTaskId, setViewTaskId] = useState<string | null>(null);
  const handleViewOpen = () => setOpenViewDialog(true);
  const handleViewClose = () => setOpenViewDialog(false);

  const [openWarningDailog, setOpenWarningDialog] = useState<boolean>(false);
  const [taskIdForWarning, setTaskIdForWarning] = useState<string>("");
  const handleWarningOpen = () => {
    setTaskIdForWarning(selectTaskId);
    setOpenWarningDialog(true);
    setAnchorEl(null);
  };
  const handleWarningClose = () => setOpenWarningDialog(false);

  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<any>, taskId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectTaskId(taskId);
  };

  const handleViewTask = () => {
    setViewTaskId(selectTaskId);
    handleViewOpen();
    setAnchorEl(null);
  };

  const handleEditTask = () => {
    setTaskId(selectTaskId);
    handleEditOpen();
    setAnchorEl(null);
  };

  const handleDeleteTask = () => {
    if (!taskIdForWarning) return;
    dispatch(deleteTask(taskIdForWarning));
    setOpenWarningDialog(false);
  };

  const renderSubtasks = (task: ITask) => {
    if (!task) return;

    const completedSubtasks = task.subtasks.filter(
      (subtask) => subtask.status === "Done"
    ).length;
    return (
      <Box>
        {completedSubtasks} of {task.subtasks.length} subtasks
      </Box>
    );
  };
  return (
    <TaskListContainer>
      {taskList?.map((task: ITask, index: number) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided, snapshot) => {
            return (
              <TaskWrapper
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                isDragging={snapshot.isDragging}
                isDraggingOver={isDraggingOver}
                style={{
                  ...provided.draggableProps.style,
                }}
              >
                <TaskTitle>{task.title}</TaskTitle>
                {renderSubtasks(task)}
                <Box
                  onClick={(e) => handleClick(e, task.id)}
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
                  <MenuItem onClick={handleViewTask}>View</MenuItem>
                  <MenuItem onClick={handleEditTask}>Edit</MenuItem>
                  <MenuItem onClick={handleWarningOpen}>Delete</MenuItem>
                </Menu>
              </TaskWrapper>
            );
          }}
        </Draggable>
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
          <ViewTaskDetail taskId={viewTaskId} />
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
