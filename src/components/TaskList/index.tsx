import { Box } from "@mui/system";
import { useSelector } from "react-redux";
//local imports
import { selectTasksByColumnId } from "redux/kanban/kanbanSelectors";
import { TaskListContainer, TaskWrapper } from "./TaskList.styles";
import { Task } from "./TaskList.types";

const TaskList = ({ columnId }: { columnId: string | null }) => {
  console.log("Column ID", columnId);
  const taskList = useSelector(selectTasksByColumnId(columnId || ""));

  return (
    <TaskListContainer>
      {taskList?.map((task: any) => (
        <TaskWrapper key={task.title}>
          <Box>{task.title}</Box>
          <Box>{task.description}</Box>
        </TaskWrapper>
      ))}
    </TaskListContainer>
  );
};

export default TaskList;
