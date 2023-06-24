import React from "react";
import { Stack, Box, Checkbox, TextField, MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//local imports
import {
  selectColumnsByBoardId,
  selectTaskByTaskId,
} from "redux/kanban/kanbanSelectors";
import { SubTaskWrapper, SubTask, DetailTitle } from "./ViewTaskDetail.styles";
import { editTask } from "redux/kanban/kanbanSlice";

export const ViewTaskDetail = ({
  handleClose,
  taskId,
}: {
  handleClose: () => void;
  taskId: string | null;
}) => {
  const { kanbanId } = useParams();

  const columns = useSelector(selectColumnsByBoardId(kanbanId ? kanbanId : ""));
  const task = useSelector(selectTaskByTaskId(taskId ? taskId : ""));
  const dispatch = useDispatch();

  const onSubTaskUpdate = (subtaskId: any) => {
    if (!task) return;
    const updateSubTasks = task.subtasks.map((item: any) => {
      if (item.id === subtaskId) {
        return {
          ...item,
          status: item.status === "Done" ? "Not Done" : "Done",
        };
      }
      return item;
    });
    const updatedTask = {
      task: { ...task, subtasks: updateSubTasks },
    };
    dispatch(editTask(updatedTask));
  };

  // const onStatusUpdate = (column: any) => {
  //   const updatedTask = {
  //     task: {
  //       ...task,
  //       status: column.title,
  //     },
  //   };
  //   dispatch(editTask(updatedTask));
  // };

  if (!task) return <Stack>There is no task detail</Stack>;
  return (
    <Stack spacing={2}>
      <Box>
        <DetailTitle>{task?.title}</DetailTitle>
      </Box>
      <Box>{task?.description}</Box>
      <Box>
        <Box mb={1}>Sub task ({task.subtasks.length})</Box>
        <SubTaskWrapper>
          {task.subtasks &&
            task.subtasks.map((subtask: any) => (
              <SubTask key={subtask.id}>
                <Checkbox
                  checked={subtask.status === "Done"}
                  onClick={() => onSubTaskUpdate(subtask.id)}
                />
                <Box
                  sx={{
                    textDecoration:
                      subtask.status === "Done" ? "line-through" : "none",
                  }}
                >
                  {subtask.name}
                </Box>
              </SubTask>
            ))}
        </SubTaskWrapper>
      </Box>
      <Box>
        <Box mb={1}>Current Status</Box>
        <TextField
          select
          size="small"
          fullWidth
          hiddenLabel
          variant="outlined"
          defaultValue={task.status}
          disabled
        >
          {columns.map((column: any) => (
            <MenuItem
              key={column.id}
              value={column.title}
              // onClick={() => onStatusUpdate(column)}
            >
              {column.title}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Stack>
  );
};
