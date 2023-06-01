import React, { useEffect, useState } from "react";
import { Grid, Badge, Button, Card, Row, Text, Col } from "@nextui-org/react";

// const Product = ({ text, size }) => {
//     return (
//       <Card>
//         <Text size={size}>{text}</Text>
//       </Card>
//     );
//   };

const Product = ({text, price, imageLink }) => {
  return (
    <>
        <Card isPressable isHoverable>
          <Card.Body css={{ p: 0 }}>
            <Card.Image
              src="https://nextui.org/images/card-example-6.jpeg"
              objectFit="cover"
              width="100%"
              height={140}
              alt={""}
            />
          </Card.Body>
          <Card.Footer css={{ justifyItems: "flex-start" }}>
            <Row wrap="wrap" justify="space-between" align="center">
              <Text b>{text}</Text>
              <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                {`${price} $`}
              </Text>
            </Row>
          </Card.Footer>
        </Card>
    </>
  )
}

export default Product;