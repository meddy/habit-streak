import React, { useState } from "react";
import { Modal } from "react-bootstrap";

interface ConfirmEmailModalProps {
  show: boolean;
  onHide: () => void;
}

export default function ConfirmEmailModal(props: ConfirmEmailModalProps) {
  // const { show, onHide } = props;
  // const [email, setEmail] = useState("");
  //
  // return (
  //   <Modal onHide={onHide} show={show}>
  //     <Modal.Header>
  //       <Modal.Title>Confirm Email</Modal.Title>
  //     </Modal.Header>
  //     <Modal.Body></Modal.Body>
  //     <Modal.Footer>
  //       <Button block type="submit" variant="primary"></Button>
  //     </Modal.Footer>
  //   </Modal>
  // );
}
