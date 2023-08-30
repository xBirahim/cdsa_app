import React, { useState } from "react";
import { Card, Container, Text, Spacer, Row } from "@nextui-org/react";
import Link from "next/link"; // Importez le composant Link depuis Next.js

const Product = ({ text, price, imageLink, name, onAddToCart, id, isARActive, activateAR }) => {
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
      const cartItem = onAddToCart({ price, quantity, id });
      const totalQuantity = quantity + (cartItem?.quantity || 0);
      setQuantity(totalQuantity);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Container>
          <Card.Image
            showSkeleton
            src={imageLink}
            objectFit="cover"
            width="200px"
            height="150px"
            alt=""
          />
          <Text p>{name}</Text>
          <Spacer y={1}/>
          <Row justify="space-between" align="center">
            <Text b>{text}</Text>
            <Text color="#006EFF" b>{`${price} €`}</Text>
          </Row>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={decrementQuantity}>-</button>
            <span style={{ margin: "0 5px" }}>{quantity}</span>
            <button onClick={incrementQuantity}>+</button>
          </div>
          <Row justify="center" align="center" style={{ marginTop: "10px" }}>
            <button onClick={handleAddToCart}>Add to Cart</button>
            <Link href="/ar"> {/* Remplacez "/ar-page" par le chemin de votre page AR */}
              <a>
                <button>AR</button>
              </a>
            </Link>
            <Spacer x={1} />
            {isARActive && typeof activateAR === "function" && (
              <button onClick={activateAR}>AR</button>
            )}
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default Product;
