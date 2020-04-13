import React from "react";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import styles from "./App.module.css";

function App() {
  return (
    <Container className={styles.container}>
      <ListGroup>
        <ListGroupItem>Read a Book</ListGroupItem>
        <ListGroupItem>Study Spanish</ListGroupItem>
        <ListGroupItem>Stretch 20 mins</ListGroupItem>
      </ListGroup>
    </Container>
  );
}

export default App;
