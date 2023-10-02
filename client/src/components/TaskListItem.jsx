import React from "react";
import "../styles/TaskListItem.scss";
import { Draggable } from "react-beautiful-dnd";



const TaskListItem = (props) => {
  const { id, name, index } = props;

  // console.log("some ID", id);
  // console.log("typeOF", typeof String(id));

  return (
    <Draggable key={id} draggableId={String(id)} index={index}>
      {(provided) => (
        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>

          {name}

        </li>
      )}
    </Draggable>
  );

};

export default TaskListItem;

