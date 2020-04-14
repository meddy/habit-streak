import React from "react";
import { Button, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./App.module.css";

function App() {
  return (
    <Container className={styles.container}>
      <ListGroup>
        <ListGroupItem className="d-flex justify-content-between">
          <span>Read a Book</span>
          <Button variant="danger" size="sm">
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </ListGroupItem>
        <ListGroupItem>Study Spanish</ListGroupItem>
        <ListGroupItem>Stretch 20 mins</ListGroupItem>
      </ListGroup>
    </Container>
  );
}

export default App;
