import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";

import HabitItem from "./HabitItem";
import { Habit, reorder } from "./habitSlice";

interface HabitListProps {
  habits: Habit[];
}

export default function HabitList(props: HabitListProps) {
  const dispatch = useDispatch();
  const { habits } = props;

  return (
    <DragDropContext
      onDragEnd={(result) => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
          return;
        }

        dispatch(
          reorder({
            sourceIndex: source.index,
            destinationIndex: destination.index,
          })
        );
      }}
    >
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ListGroup>
              {habits.map((habit, index) => (
                <Draggable draggableId={habit.id} index={index} key={habit.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <HabitItem habit={habit} />
                    </div>
                  )}
                </Draggable>
              ))}
            </ListGroup>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
