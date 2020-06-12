import { List } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

import { Habit, reorder } from "../slices/habitSlice";

import HabitItem from "./HabitItem";

const ListWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.background.paper,
}));

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
          <ListWrapper ref={provided.innerRef} {...provided.droppableProps}>
            <List>
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
            </List>
            {provided.placeholder}
          </ListWrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
}
