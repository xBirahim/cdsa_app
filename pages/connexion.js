import React, { useState, useEffect } from "react";
import { Modal, Button, Text, Input } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import useAuthStore from "../utils/store";
import bcrypt from "bcryptjs";


export default function App({ closeModal }) {
  const [visible, setVisible] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();
  const { addUser } = useAuthStore();
  const SALT_ROUNDS = 10;

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.get(
        `https://64e3bc10bac46e480e7923a0.mockapi.io/revendeur?email=${login}`
      );

      const users = response.data;
      const foundUser = users.find((user) => user.email === login);

      if (foundUser) {
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);

        if (isPasswordValid) {
          addUser(foundUser);
          setLoginError(false);

          setVisible(false);
          if (foundUser.role === "") {
            router.push("/mac");
          } else if (foundUser.role === "client") {
            router.push("/productlist");
          }
        } else {
          setLoginError(true);
        }
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error("Erreur lors de l'authentification :", error);
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
          Connexion
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
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {loginError && <Text color="error">Login ou mot de passe incorrect.</Text>}
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeModal}>
          Fermer
        </Button>
        <Button auto onPress={handleLogin} color="green">
          Se connecter
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
