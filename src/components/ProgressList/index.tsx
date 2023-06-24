import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

//local imports
import TaskList from "../TaskList";
import {
  ProgressListContainer,
  Progress,
  ColorCircle,
} from "./ProgressList.styles";
import { selectColumnsByBoardId } from "redux/kanban/kanbanSelectors";
import { IColumn } from "redux/kanban/kanban.types";
import { updateTaskStatus } from "redux/kanban/kanbanSlice";
import { generateRandomColor } from "utils/helpers";

const ProgressList = () => {
  const { kanbanId } = useParams();
  const dispatch = useDispatch();
  const columns = useSelector(selectColumnsByBoardId(kanbanId || ""));

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.find(
        (column: IColumn) => column.id === source.droppableId
      );
      const destinationColumn = columns.find(
        (column: IColumn) => column.id === destination.droppableId
      );

      const draggedTaskId = sourceColumn.tasks[source.index];
      const payload = {
        sourceColumnId: sourceColumn.id,
        destinationColumnId: destinationColumn.id,
        taskId: draggedTaskId,
      };
      dispatch(updateTaskStatus(payload));
    }
  };
  return (
    <ProgressListContainer>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        {columns.map((column: any) => (
          <Box key={column.id}>
            <Progress>
              <ColorCircle circleColor={generateRandomColor()}></ColorCircle>
              {column.title}({column.tasks.length})
            </Progress>
            <Droppable
              droppableId={column.id as string}
              key={column.id as string}
            >
              {(provided, snapshot) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{
                    backgroundColor: snapshot.isDraggingOver
                      ? "background.default"
                      : "background.paper",
                    width: "100%",
                    minHeight: "100%",
                  }}
                >
                  <TaskList
                    columnId={column.id}
                    isDraggingOver={snapshot.isDraggingOver}
                  />
                </Box>
              )}
            </Droppable>
          </Box>
        ))}
        {/* <NewColumn>+New Column</NewColumn> */}
      </DragDropContext>
    </ProgressListContainer>
  );
};

export default ProgressList;
