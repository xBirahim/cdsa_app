import React, { useEffect, useState } from "react";
import { Grid, Badge, Card, Row, Text, Col, Divider } from "@nextui-org/react";

const Product = ({ text, price, imageLink, description, onAddToCart }) => {
  useEffect(() => {
    document.body.style.backgroundColor = "#D2B48C";
  }, []);

  const [quantity, setQuantity] = useState(0);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (typeof onAddToCart === "function") {
      onAddToCart({ text, price, quantity });
    }
  };

  return (
    <>
      <Card isPressable isHoverable css={{ height: "300px", width: "250px", minHeight: "150px", minWidth: "300px" }}>
        <Card.Body css={{ display: "flex", flexDirection: "column", alignItems: "flex-start", p: 0 }}>
          <Card.Image
            showSkeleton
            src={imageLink || "https://media3.coffee-webstore.com/22681-home_default/cafe-en-grains-caffe-corsini-espresso-1kg.jpg"}
            objectFit="cover"
            width="100%"
            height="100%"
            alt={""}
          />
          <Text p css={{ fontSize: "10px", marginTop: "10px" }}>{description}</Text>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <div>
              <Text b css={{ fontSize: "14px", fontWeight: "bold", marginBottom: "2px" }}>{text}</Text>
              <Text css={{ fontSize: "15px", marginBottom: "2px", color: "#006EFF", fontWeight: "bold" }}>{`${price} €`}</Text>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
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
            <button onClick={handleAddToCart} style={{ backgroundColor: "#ADD8E6", color: "#FFFFFF", padding: "5px 10px", border: "none", borderRadius: "5px" }}>
              Ajouter au panier
            </button>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
