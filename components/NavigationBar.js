import React, { useState } from "react";
import { Button, Link, Navbar, Text, Popover } from "@nextui-org/react";
import { useRouter } from "next/router";

const NavigationBar = ({ children }) => {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState("");

  const handleCartClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setCartCount((prevCount) => prevCount + item.quantity);
  };

  const handleContactChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedContact(selectedValue);

    if (selectedValue === "clients") {
      router.push("/users"); // Rediriger vers la page des clients
    } else if (selectedValue === "revendeurs") {
      router.push("/revendeurs"); // Rediriger vers la page des revendeurs
    }
  };

  const handleHomeClick = () => {
    router.push("/"); // Rediriger vers la page d'accueil
  };

  return (
    <Navbar
      isCompact
      isBordered
      variant="sticky"
      css={{ width: "100%", backgroundColor: "#4A2511", marginBottom: "-35px" }}
    >
      <Navbar.Brand>
        <link rel="icon" href="/favicon.ico" />
        <Text onMouseDown={handleHomeClick} b color="inherit" hideIn="xs">
          PAYE TON KAWA
        </Text>
      </Navbar.Brand>
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
      
      <Navbar.Content>
        <Navbar.Link color="inherit" href="/login">
          Login
        </Navbar.Link>
        <Navbar.Item>
          <Button auto flat as={Link} href="/register">
            Register
          </Button>
        </Navbar.Item>
        <Navbar.Item>
          <Link href="/panier">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/57/57451.png?w=360"
                  alt="Cart"
                  style={{ width: "30px", height: "30px", cursor: "pointer" }}
                  onClick={handleCartClick}
                />
                {cartCount > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    {cartCount}
                  </div>
                )}
              </div>
              <Text b style={{ marginLeft: "8px" }}>
                Mon panier
              </Text>
              {isPopoverOpen && (
                <Popover
                  anchorRef={() => {}}
                  onClose={() => setIsPopoverOpen(false)}
                  position="bottom"
                  width="200px"
                  open
                >
                  <Popover.Header>Mon panier</Popover.Header>
                  <Popover.Content>
                    {cartItems.length > 0
                      ? `${cartItems.length} item(s) in the cart`
                      : "No items in the cart"}
                  </Popover.Content>
                </Popover>
              )}
            </div>
          </Link>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};

export default NavigationBar;
