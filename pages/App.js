import React, { useState, useEffect } from "react";
import { Modal, Button, Text, Input, Row, Checkbox, Radio } from "@nextui-org/react";
import { useRouter } from "next/router";
import axios from "axios";

export default function App({ closeModal }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [societe, setSociete] = useState("");
  const [isRevendeur, setIsRevendeur] = useState(false);
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);

  const handleSignIn = async () => {
    const user = {
      nom,
      prenom,
      login,
      email,
      password,
      societe: isRevendeur ? societe : "",
      role: isRevendeur ? "revendeur" : "client",
    };

    try {
      const response = await axios.post(
        "https://64e3bc10bac46e480e7923a0.mockapi.io/revendeur",
        user
      );

      if (response.status === 201) {
        if (isRevendeur) {
          router.push("/mac");
        } else {
          router.push("/productlist");
        }
      } else {
        console.error("Registration failed.");
      }
      closeModal(); // Close the modal after redirection
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

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
          <br />
          <Text size={16}>Le café c'est la vie</Text>
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
          value={nom}
          onChange={e => setNom(e.target.value)}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Prénom"
          value={prenom}
          onChange={e => setPrenom(e.target.value)}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Login"
          value={login}
          onChange={e => setLogin(e.target.value)}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {isRevendeur && (
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Société"
            value={societe}
            onChange={e => setSociete(e.target.value)}
          />
        )}
        <Row justify="space-between">
          <Checkbox>
            <Text size={14}>Remember me</Text>
          </Checkbox>
          <Text size={14}>Forgot password?</Text>
        </Row>

        <Radio.Group
          value={isRevendeur ? "revendeur" : "client"}
          onChange={value => setIsRevendeur(value === "revendeur")}
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
        <Button auto onPress={handleSignIn} color="Green">
          Sign in
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
