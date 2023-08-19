import React, { useState, useEffect } from "react";
import { Card, Container, Text, Spacer, Row } from "@nextui-org/react";

const Product = ({ text, price, imageLink, name, onAddToCart, id }) => {
  useEffect(() => {
    document.body.style.backgroundColor = "#D2B48C";
  }, []);

  const [quantity, setQuantity] = useState(0);

  const incrementQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity + quantity);
    } else if (quantity === 0) {
      setQuantity(0);
    }
  };

  const decrementQuantity = () => {
    if (quantity <prevQuantity) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    } else if (quantity <0) {
      setQuantity(prevQuantity);
    }
  };

  const handleAddToCart = () => {
    if (typeof onAddToCart === "function") {
      const cartItem = onAddToCart({price, quantity, id });
      const totalQuantity = quantity + (cartItem?.quantity || 0);
      setQuantity(totalQuantity);
    }
  };

  return (
    <Card
      isPressable
      isHoverable
      css={{
        height: "250px",
        width: "250px",
        minHeight: "50px",
        minWidth: "180px",
        marginLeft: "-7px"
      }}
    >
      <Card.Body
        css={{ display: "flex", flexDirection: "column", alignItems: "flex-start", p: 0 }}
      >
        <Container>
          <Card.Image
            showSkeleton
            src={imageLink || "https://www.lardechoise.net/wp-content/uploads/IMG_7253-scaled.jpg"}
            objectFit="cover"
            width="250px"
            height="200px"
            alt={""}
          />
          <Text p css={{ fontSize: "10px", marginTop: "-20px", width: "200px" }}>
            {name}
          </Text>
          <Spacer y={1} />
          <Row justify="space-between" align="center" css={{ width: "100%" }}>
            <Text b css={{ fontSize: "14px", fontWeight: "bold", marginBottom: "2px" }}>
              {text}
            </Text>
            <Text
              css={{
                fontSize: "15px",
                marginBottom: "2px",
                color: "#006EFF",
                fontWeight: "bold"
              }}
            >{`${price} €`}</Text>
          </Row>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={decrementQuantity}
              style={{
                backgroundColor: "#ADD8E6",
                color: "#FFFFFF",
                padding: "3px 8px",
                border: "none",
                borderRadius: "5px"
              }}
            >
              -
            </button>
            <span style={{ margin: "0 5px" }}>{quantity}</span>
            <button
              onClick={incrementQuantity}
              style={{
                backgroundColor: "#ADD8E6",
                color: "#FFFFFF",
                padding: "3px 8px",
                border: "none",
                borderRadius: "5px"
              }}
            >
              +
            </button>
          </div>
          <Row justify="center" align="center" css={{ marginTop: "10px" }}>
            <button
              onClick={handleAddToCart}
              style={{
                backgroundColor: "#ADD8E6",
                color: "#FFFFFF",
                padding: "5px 10px",
                border: "none",
                borderRadius: "5px",
                height: "35px"
              }}
            >
              Ajouter au panier
            </button>
            <Spacer x={1} />
            {/* Assurez-vous que cette fonction est correctement définie */}
            <button
              onClick={() => activateXR()}
              style={{
                backgroundColor: "#ADD8E6",
                color: "#FFFFFF",
                padding: "5px 10px",
                border: "none",
                borderRadius: "5px",
                height: "35px"
              }}
            >
              Voir en réalité
            </button>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default Product;
