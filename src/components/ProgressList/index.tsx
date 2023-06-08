import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

//local imports
import TaskList from "../TaskList";
import { Task } from "../TaskList/TaskList.types";
import { ColorMap } from "./ProgressList.types";

import {
  ProgressListContainer,
  Progress,
  ColorCircle,
} from "./ProgressList.styles";
import { selectColumnsByBoardId } from "redux/kanban/kanbanSelectors";

const colorMap: ColorMap = {
  todo: "#49C4E5",
  doing: "#635FC7",
  done: "#67E2AE",
};

const ProgressList = () => {
  const { kanbanId } = useParams();
  const columns = useSelector(selectColumnsByBoardId(kanbanId || ""));
  // const tasks = useSelector(selectColumnsByBoardId(1));

  // const [progressList, setProgressList] = useState<string[]>([
  //   "Todo",
  //   "Doing",
  //   "Done",
  // ]);
  // const [taskList, setTaskList] = useState<Task[] | null>([
  //   { title: "To Do 1", description: "Design the layout" },
  //   { title: "To Do 2", description: "Design the sidebar" },
  // ]);

  return (
    <ProgressListContainer>
      {columns.map((column: any) => (
        <Box key={column.id}>
          <Progress>
            <ColorCircle
              circleColor={colorMap[column.title.toLowerCase()] || "#EA5555"}
            ></ColorCircle>
            {column.title}({column.tasks.length})
          </Progress>
          <TaskList columnId={column.id} />
        </Box>
      ))}
    </ProgressListContainer>
  );
};

export default ProgressList;
