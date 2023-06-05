import React, { useState } from "react";
import { Button, Link, Navbar, Text, Popover } from "@nextui-org/react";
import { useRouter } from "next/router";

const NavigationBar = ({ children }) => {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleCartClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setCartCount((prevCount) => prevCount + item.quantity);
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
        <Text onClick={() => router.push("#")} b color="inherit" hideIn="xs">
          PAYE TON KAWA
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="underline">
        <Navbar.Link onMouseOver={(e) => console.log(e)} href="#">
          Home
        </Navbar.Link>
        <Navbar.Link href="#">Lien</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Link color="inherit" href="login">
          Login
        </Navbar.Link>
        <Navbar.Item>
          <Button auto flat as={Link} href="register">
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
