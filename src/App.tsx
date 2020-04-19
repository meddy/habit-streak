import React, { useState } from "react";
import { Container, ListGroup } from "react-bootstrap";

import styles from "./App.module.css";
import HabitItem from "./HabitItem";
import NewHabitForm from "./NewHabitForm";

export default function App() {
  const [items, setItems] = useState([
    { label: "Read a book", isComplete: true },
    { label: "Study Spanish", isComplete: false },
    { label: "Stretch 20 mins", isComplete: false },
  ]);

  return (
    <Container className={styles.container}>
      <NewHabitForm
        onSubmit={(newItemLabel) =>
          setItems(items.concat([{ label: newItemLabel, isComplete: false }]))
        }
        habitItems={items.map((item) => item.label)}
      />
      <ListGroup>
        {items.map(({ isComplete, label }) => (
          <HabitItem
            key={label}
            isComplete={isComplete}
            label={label}
            onDelete={() => {
              setItems(items.filter((item) => item.label !== label));
            }}
            onToggle={() => {
              setItems(
                items.map((item) => {
                  if (item.label === label) {
                    return { ...item, isComplete: !item.isComplete };
                  }

                  return item;
                })
              );
            }}
          />
        ))}
      </ListGroup>
    </Container>
  );
}
