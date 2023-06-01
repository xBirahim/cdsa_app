import React, { useEffect, useState } from "react";
import { Grid, Badge, Button, Card, Row, Text, Col } from "@nextui-org/react";

// const Product = ({ text, size }) => {
//     return (
//       <Card>
//         <Text size={size}>{text}</Text>
//       </Card>
//     );
//   };

const Product = ({ text, price, imageLink }) => {
  return (
    <>
      <Card isPressable isHoverable css={{ height: "200px", width: "400px", minHeight: "150px", minWidth: "300px"}}>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            showSkeleton
            src="https://th.bing.com/th/id/OIP.sexu7DhkQ6zvPDthHS34MgHaHa?pid=ImgDet&rs=1"
            objectFit="cover"
            width="100%"
            height="100%"
            alt={""}
          />
        </Card.Body>
        <Card.Divider />
        <Card.Footer css={{ justifyItems: "flex-start" }}>
          <Row wrap="wrap" justify="space-between" align="center">
            <Text b>{text}</Text>
            <Text b css={{ color: "#006EFF", fontWeight: "$bold", fontSize: "$sm" }}>
              {`${price}`}
            </Text>
          </Row>
        </Card.Footer>
      </Card>
    </>
  )
}

export default Product;