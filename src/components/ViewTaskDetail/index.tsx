import React from "react";
import { Stack, Box, Checkbox, TextField, MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

//local imports
import { ITask } from "redux/kanban/kanban.types";
import { selectColumnsByBoardId } from "redux/kanban/kanbanSelectors";
import { SubTaskWrapper, SubTask, DetailTitle } from "./ViewTaskDetail.styles";

export const ViewTaskDetail = ({
  handleClose,
  task,
}: {
  handleClose: () => void;
  task: ITask | null;
}) => {
  const { kanbanId } = useParams();

  const columns = useSelector(selectColumnsByBoardId(kanbanId ? kanbanId : ""));
  console.log("Task Deaitlal", task);

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
            task.subtasks.map((task, index) => (
              <SubTask key={index}>
                <Checkbox defaultChecked />
                <Box>{task.name}</Box>
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
          sx={{
            color: "theme.palette.text.primary",
          }}
        >
          {columns.map((column: any) => (
            <MenuItem key={column.id} value={column.title}>
              {column.title}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Stack>
  );
};
