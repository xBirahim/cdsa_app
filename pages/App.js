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
          Bienvenue chez&nbsp;
          <Text b size={18}>
            PayeTonKAWA
          </Text>
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
          placeholder="Nom"
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Prénom"
        />
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
          placeholder="Email"
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Password"
        />
                {isRevendeur && (
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Société"
          />
        )}
        <Row justify="space-between">
          <Checkbox>
            <Text size={14}>Remember me</Text>
          </Checkbox>
          <Text size={14}>Forgot password?</Text>
        </Row>

        <Radio.Group // Enveloppez les composants Radio dans un Radio.Group
          value={isRevendeur ? "revendeur" : "nonRevendeur"}
          onChange={(value) => setIsRevendeur(value === "revendeur")}
          label="Qui etes vous?"
          orientation="horizontal"
        >
          <Radio value="revendeur">Revendeur</Radio>
          <Radio value="client">Client</Radio>
        </Radio.Group>
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
