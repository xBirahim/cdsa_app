import React, { useEffect, useState } from "react";
import { Grid, Badge, Card, Row, Text, Col, Divider, Spacer,Container } from "@nextui-org/react";


const Product = ({ text, price, imageLink, name, onAddToCart, id }) => {
  useEffect(() => {
    document.body.style.backgroundColor = "#D2B48C";
  }, []);

  const [quantity, setQuantity] = useState(1); // Modifié ici, initialisé à 1 au lieu de 0

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) { // Modifié ici, vérifie que la quantité est supérieure à 1 avant de la décrémenter
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (typeof onAddToCart === "function") {
      onAddToCart({ text, price, quantity, id }); // Ajoutez l'id du produit lors de l'ajout au panier
    }
  };

  return (
    <>
      <Card isPressable isHoverable css={{ height: "300px", width: "250px", minHeight: "50px", minWidth: "180px", marginLeft: "-7px"}}>
        <Card.Body css={{ display: "flex", flexDirection: "column", alignItems: "flex-start", p: 0 }}>
          <Container>
          <Card.Image
            showSkeleton
            src={imageLink || "https://www.lardechoise.net/wp-content/uploads/IMG_7253-scaled.jpg"}
            objectFit="cover"
            width="400px"
            height="200px"
            
            alt={""}
          />
          <Text p css={{ fontSize: "10px", marginTop: "-20px", width:"200px"}}>{name}</Text><Spacer y={1}/>
          <div >
            <div >
              <Text b css={{ fontSize: "14px", fontWeight: "bold", marginBottom: "2px" }}>{text}</Text>
              <Text css={{ fontSize: "15px", marginBottom: "2px", color: "#006EFF", fontWeight: "bold" }}>{`${price} €`}</Text>
            
              <button onClick={incrementQuantity} style={{ backgroundColor: "#ADD8E6", color: "#FFFFFF", padding: "3px 8px", border: "none", borderRadius: "5px" }}>
                +
              </button>
              <span style={{ margin: "0 5px" }}>{quantity}</span>
              <button onClick={decrementQuantity} style={{ backgroundColor: "#ADD8E6", color: "#FFFFFF", padding: "3px 8px", border: "none", borderRadius: "5px" }}>
                -
              </button>
            </div>
          </div>
          <Row justify="center" align="center" css={{ marginTop: "10px" }}>
            <button onClick={handleAddToCart} style={{ backgroundColor: "#ADD8E6", color: "#FFFFFF", padding: "5px 10px", border: "none", borderRadius: "5px", height:"35PX" }}>
              Ajouter au panier
            </button><Spacer x={1}/>
            <button onclick="activateXR()" style={{ backgroundColor: "#ADD8E6", color: "#FFFFFF", padding: "5px 10px", border: "none", borderRadius: "5px", height:"35PX" }}>
              Voir en réalité
            </button>
          </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
