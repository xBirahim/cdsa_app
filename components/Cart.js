import { Table, Row, Col, Tooltip, User, Text, Button, Card, Divider } from "@nextui-org/react"; 
import { useRouter } from "next/router";
import { products } from "tests/data";
import { useState } from "react";
import { Delete, Edit, Show } from "react-iconly";

export default function Cart() {

  const router = useRouter();
  const [items, setItems] = useState([]);

  // Fonction pour ajouter un élément au panier
  const addItemToCart = (item) => {
    setItems([...items, item]);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += parseFloat(item.price);
    });
    return totalPrice.toFixed(2);
  };

  const handleContinuerAchatsClick = () => {
    console.log("Continuer Achats");
  };

  const handleContinuezLivraisonClick = () => {
    console.log("Continuer Livraison");
  };

  return (
    <Card color="black" css={{maxW:"400px"}}>
      <Card.Body>
        {items.length > 0 ? (
          <>
            {items.map((item) => (
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
                Vous avez ajouté {items.length} article(s) récemment.
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
          <Text style={{ fontSize: "14px", color: "#5d5d5d" }}>dont taxes</Text>
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
            Continuer mes achats
          </Button>
          <Button auto color="brown" onClick={handleContinuezLivraisonClick}>
            Continuez vers la livraison
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}