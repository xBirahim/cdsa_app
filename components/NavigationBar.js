import React, { useState } from "react";
import { Button, Link, Navbar, Text, Popover } from "@nextui-org/react";
import { useRouter } from "next/router";

const NavigationBar = ({ children }) => {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState("");

  // Autres fonctions restent inchangées

  const handleHomeClick = () => {
    router.push("/"); // Rediriger vers la page d'accueil
  };

  return (
    <Navbar
      isCompact
      isBordered
      variant="sticky"
      css={{
        width: "100%",
        backgroundColor: "#4A2511",
        marginBottom: "-35px",
      }}
    >
      {/* ... */}
      
      {/* Utilisation des Media Queries pour ajuster les styles */}
      <Navbar.Content hideIn="xs" variant="underline">
        <Navbar.Link color="inherit" href="/productlist">
          Nos produits
        </Navbar.Link>
        <Navbar.Link onMouseOver={(e) => console.log(e)} href="/">
          Home
        </Navbar.Link>
        <Navbar.Link color="inherit" href="/users">
          Clients
        </Navbar.Link>
        <Navbar.Link color="inherit" href="/Revendeurs">
          Revendeurs
        </Navbar.Link>
      </Navbar.Content>
      
      {/* Utilisation des Media Queries pour ajuster les styles */}
      <Navbar.Content hideIn="sm">
        <Navbar.Link color="inherit" href="/login">
          Login
        </Navbar.Link>
        <Navbar.Item>
          <Button auto flat as={Link} href="/register">
            Register
          </Button>
        </Navbar.Item>
      </Navbar.Content>

      <Navbar.Content>
        {/* ... */}
      </Navbar.Content>
    </Navbar>
  );
};

export default NavigationBar;
