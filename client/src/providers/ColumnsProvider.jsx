import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const columnsContext = createContext();

export default function ColumnsProvider(props) {
  const initialColumnData = {
    1: { name: "To Do", tasks: [] },
    2: { name: "In Progress", tasks: [] },
    3: { name: "In Review", tasks: [] },
    4: { name: "Complete!", tasks: [] },
  };

  const [columns, setColumns] = useState(initialColumnData);

  // useEffect(() => {
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tasks");
      console.log("Tasks received from server:", res.data);
      setColumns((prevColumns) => {
        let newTasks = {};
        return {
          ...prevColumns,
          [1]: {
            ...prevColumns[1],
            tasks: res.data,
          },
        };
      });

      console.log("After data transformation:", columns);
    } catch (error) {
      console.error("Could not fetch tasks", error);
    }
  };

  // }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceTasks = [...sourceColumn.tasks];
      const destTasks = [...destColumn.tasks];
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTasks,
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destTasks,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedTasks = [...column.tasks];
      const [removed] = copiedTasks.splice(source.index, 1);
      copiedTasks.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedTasks,
        },
      });
    }
  };

  const columnData = { columns, fetchTasks, onDragEnd };

  return (
    <columnsContext.Provider value={columnData}>
      {props.children}
    </columnsContext.Provider>
  );
}