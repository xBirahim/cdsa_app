import React, { useState, useEffect } from "react";
import { Modal, Button, Text, Input, Row, Checkbox, Radio } from "@nextui-org/react";

export default function App({ closeModal }) {
  const [visible, setVisible] = useState(false);
  const [isRevendeur, setIsRevendeur] = useState(false); // État du bouton radio

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={() => {
        closeModal();
        setVisible(false);
      }}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Connexion
          <br></br>
          <Text size={16}>
            Le café c'est la vie
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Login"
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Password"
          contentLeft={<Password fill="currentColor" />}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeModal}>
          Close
        </Button>
        <Button auto onPress={closeModal} color="Green">
          Sign in
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
