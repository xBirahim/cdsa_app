import React, { useState, useEffect } from "react";
import { Dropdown, Avatar, Navbar, Link, Text, Button, Modal } from "@nextui-org/react";
import { User } from "react-iconly";
import axios from "axios"; // Importez axios pour effectuer des requêtes API
import App from "../pages/App"; // Mettez à jour avec le bon chemin
import Panier from "../pages/panier"; // Mettez à jour le chemin vers le composant Panier
import Connexion from "../pages/connexion"; // Renommez le composant importé

const NavigationBar = () => {
  const [appVisible, setAppVisible] = useState(false);
  const [panierVisible, setPanierVisible] = useState(false);
  const [connexionVisible, setConnexionVisible] = useState(false);

  const closeAppModal = () => {
    setAppVisible(false);
  };
  const closePanierModal = () => {
    setPanierVisible(false);
  };
  const closeConnexionModal = () => {
    setConnexionVisible(false);
  };

  const collapseItems = ["Accueil", "Nos Cafés", "Machine à café", "Déconnexion"];

  useEffect(() => {
    if (appVisible || connexionVisible || panierVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [appVisible, connexionVisible, panierVisible]);

  const [userData, setUserData] = useState({
    id: null,
    name: "",
    // Ajoutez d'autres propriétés de données utilisateur que vous souhaitez récupérer
  });

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`https://64e3bc10bac46e480e7923a0.mockapi.io/revendeur/${userId}`);
      const userDataFromApi = response.data;
      setUserData({
        id: userDataFromApi.id,
        name: userDataFromApi.name,
        // Mettez à jour les autres propriétés de données utilisateur si nécessaire
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des données utilisateur :", error);
    }
  };

  return (
    <div>
      {appVisible && <App closeModal={() => setAppVisible(false)} />}
      {panierVisible && <Panier closeModal={() => setPanierVisible(false)} />}
      {connexionVisible && <Connexion closeModal={() => setConnexionVisible(false)} />}

      <Navbar isBordered variant="static">
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand
          css={{
            "@xs": {
              w: "12%",
            },
          }}
        >
          <Text b color="inherit" hideIn="xs">
            Paye ton Kawa
          </Text>
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          activeColor="secondary"
          hideIn="xs"
          variant="highlight-rounded"
        >
          <Navbar.Link href="/">Home</Navbar.Link>
          <Navbar.Link href="/productlist">Nos Cafés</Navbar.Link>
          <Navbar.Link href="/mac">Machine à café</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content
          css={{
            "@xs": {
              w: "12%",
              jc: "flex-end",
            },
          }}
        >
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar bordered as="button" size="md" icon={<User set="bold" />} />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="App" css={{ height: "$18" }}>
                <Button color="Black" onClick={() => setAppVisible(true)}>
                  Inscription
                </Button>
              </Dropdown.Item>
              <Dropdown.Item key="Connexion" css={{ height: "$18" }}>
                <Button color="Black" onClick={() => setConnexionVisible(true)}>
                  Connexion
                </Button>
              </Dropdown.Item>       
              <Dropdown.Item key="Panier" css={{ height: "$18" }}>
                <Button color="Black" onClick={() => setPanierVisible(true)}>
                  Panier
                </Button>
              </Dropdown.Item>          
            </Dropdown.Menu>
            
          </Dropdown>
        </Navbar.Content>
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem
              key={item}
              activeColor="secondary"
              css={{
                color: index === collapseItems.length - 1 ? "$error" : "",
              }}
              isActive={index === 2}
            >
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href={index === 0 ? "/" : index === 1 ? "/productlist" : "/mac"}
              >
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationBar;