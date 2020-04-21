import React from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

import HabitItem from "../habit/HabitItem";
import NewHabitForm from "../habit/NewHabitForm";
import { RootState } from "../app/store";

export default function Home() {
  const habits = useSelector((state: RootState) => state.habits);

  return (
    <>
      <NewHabitForm
        onSubmit={
          (newItemLabel) => {}
          // setItems(items.concat([{ label: newItemLabel, isComplete: false }]))
        }
      />
      <ListGroup>
        {habits.map(({ isComplete, label }) => (
          <HabitItem
            key={label}
            isComplete={isComplete}
            label={label}
            onDelete={() => {
              // setItems(items.filter((item) => item.label !== label));
            }}
            onToggle={() => {
              // setItems(
              //   items.map((item) => {
              //     if (item.label === label) {
              //       return { ...item, isComplete: !item.isComplete };
              //     }
              //
              //     return item;
              //   })
              // );
            }}
          />
        ))}
      </ListGroup>
    </>
  );
}
