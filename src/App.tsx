import React, { useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import styles from "./App.module.css";
import HabitItem from "./HabitItem";
import NewHabitForm from "./NewHabitForm";

function App() {
  const [items, setItems] = useState([
    "Read a book",
    "Study Spanish",
    "Stretch 20 mins",
  ]);
  return (
    <Container className={styles.container}>
      <NewHabitForm onSubmit={(newItem) => setItems(items.concat([newItem]))} />
      <ListGroup>
        {items.map((label) => (
          <HabitItem
            key={label}
            label={label}
            onDelete={() => {
              setItems(items.filter((item) => item !== label));
            }}
          />
        ))}
      </ListGroup>
    </Container>
  );
}

export default App;
