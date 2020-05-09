import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { ListGroup } from "react-bootstrap";

import HabitItem from "./HabitItem";
import { Habit } from "./habitSlice";
import { reorder } from "./orderSlice";

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
                <Draggable key={habit.id} draggableId={habit.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={provided.draggableProps.style}
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
