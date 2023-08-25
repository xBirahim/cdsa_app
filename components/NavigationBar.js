import React, { useState, useEffect } from "react";
import { Dropdown, Avatar, Navbar, Link, Text, Button } from "@nextui-org/react";
import { User } from "react-iconly";
import App from "../pages/App"; // Mettez à jour avec le bon chemin

const NavigationBar = () => {
  const [appVisible, setAppVisible] = useState(false);

  const closeAppModal = () => {
    setAppVisible(false);
  };

  const collapseItems = ["Home", "Nos Cafés", "Machine à café", "Déconnexion"];

  useEffect(() => {
    if (appVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [appVisible]);

  return (
    <div>
      {appVisible && <App closeModal={() => setAppVisible(false)} />}
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
                <Button color="Black" onClick={() => setAppVisible(true)}>
                  Connexion
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
