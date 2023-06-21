import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Card, Container, Divider, Text } from "@nextui-org/react";

const Cart = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += parseFloat(item.price);
    });
    return totalPrice.toFixed(2);
  };

  useEffect(() => {
    console.log("Produits dans le panier :", cartItems);
  }, [cartItems]);

  const handleContinuerAchatsClick = () => {
    router.push("/productlist");
  };

  const handleContinuezLivraisonClick = () => {
    router.push("/livraison");
  };

  return (
    <Container justify="center" css={{ width: "100%", height:"100vh"}}>
      <Text
        style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Mon panier
      </Text>
      <Card>
        <Card.Body>
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div key={item.id}>
                  <Text>{item.text}</Text>
                  <Text>{`Quantité: ${item.quantity}`}</Text>
                  <Text>{`Prix: ${item.price} €`}</Text>
                  <Divider />
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "20px",
                }}
              >
                <Text style={{ fontSize: "14px", color: "#5d5d5d" }}>
                  Vous avez ajouté {cartItems.length} article(s) récemment.
                </Text>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px",
              }}
            >
              <Text style={{ fontSize: "14px", color: "#5d5d5d" }}>
                Il n'y a plus d'articles dans votre panier.
              </Text>
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
              Total TTC
            </Text>
            <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
              {calculateTotalPrice()} €
            </Text>
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Text style={{ fontSize: "14px", color: "#5d5d5d" }}>
              dont taxes
            </Text>
            <Text style={{ fontSize: "14px", color: "#5d5d5d" }}>0,00 €</Text>
          </div>
          <Divider />
          <div>
            <Text style={{ fontSize: "14px", color: "#5d5d5d" }}>
              Livraison :
            </Text>
            <Text style={{ fontSize: "14px", color: "#006e92" }}>
              Offerte en point relais à partir de 69 €
            </Text>
            <Text style={{ fontSize: "14px", color: "#006e92" }}>
              Offerte à domicile / bureau à partir de 119 €
            </Text>
          </div>
          <Divider />
          <div>
            <Text style={{ fontSize: "14px", color: "#5d5d5d" }}>
              Nous vous répondons avec le sourire :
            </Text>
            <Text
              style={{ fontSize: "14px", color: "#006e92", fontWeight: "bold" }}
            >
              0988 998 998
            </Text>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Button auto color="brown" onClick={handleContinuerAchatsClick}>
              Achats
            </Button>
            <Button auto color="brown" onClick={handleContinuezLivraisonClick}>
              Livraison
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Cart;