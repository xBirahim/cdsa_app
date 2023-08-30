import React, { useState, useEffect } from "react";
import { Modal, Button, Text, Input, Row, Checkbox, Radio } from "@nextui-org/react";
import axios from "axios"; // Importez axios pour effectuer des requêtes API
import { useRouter } from "next/router"; // Importez useRouter pour gérer les redirections
import useAuthStore from "../utils/store";

export default function App({ closeModal }) {
  const [visible, setVisible] = useState(false);
  const [isRevendeur, setIsRevendeur] = useState(false); // État du bouton radio
  const [login, setLogin] = useState(""); // État du champ de connexion
  const [password, setPassword] = useState(""); // État du champ de mot de passe
  const [loginError, setLoginError] = useState(false); // État pour gérer les erreurs de connexion
  const router = useRouter(); // Utilisez le hook useRouter pour les redirections
  const { userProfile, addUser, removeUser } = useAuthStore();

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleLogin = async () => {
    try {
      console.log("Trying to login with:");
      console.log("Login:", login);
      console.log("Password:", password);
  
      const response = await axios.get(
        `https://64e3bc10bac46e480e7923a0.mockapi.io/revendeur?email=${login}&password=${password}`
      );

      const users = response.data;

      console.log(users);

      const foundUser = users.find(user => user.email === login && user.password === password);
      
      console.log(response);
      // Si les données sont correctes, effectuez la redirection ici
      if (foundUser) {

        addUser(foundUser)

        setVisible(false)
        // Redirection vers la page appropriée en fonction du rôle
        if (foundUser.role == "") {
          router.push("/mac");
        } else if (foundUser.role == "client"){
          router.push("/productlist");
        }
      } else {
        // Affichage d'une erreur de connexion
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
        <Button auto onPress={handleLogin} color="Green">
          Se connecter
        </Button>
      </Modal.Footer>
    </Modal>
  );
}