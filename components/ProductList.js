import {
  Grid,
  Card,
  Text,
  Row,
  Image,
  Button,
  Spacer,
} from "@nextui-org/react";
import { Plus, Show } from "react-iconly";

export default function ProductList({product}) {
return (
  <Grid xs={10}>
    <Card
      isHoverable
      color="black"
      css={{ maxW: "400px" }}
      onPress={() => {
        console.log("display product infos");
      }}
    >
      <Card.Body>
        <Row justify="center" align="center">
          {/* <Image
            objectFit="cover"
            src={product.image}
          ></Image> */}
          <iframe
            src="https://my.spline.design/iphone14procopy-56af5c0c2a9cbd3fc14004cea1db603f/"
            frameborder="0"
            width="100%"
            height="100%"
          ></iframe>
        </Row>
        <Row justify="center" align="center">
          <Text h4 size={20} css={{ m: 0 }}>
            {product.name}
          </Text>
        </Row>
        <Row justify="center" align="center">
          <Text h4 size={15} b css={{ m: 0 }}>
            $ {product.price}
          </Text>
        </Row>
        <Row justify="center" align="center">
          <Button css={{ mt: 10 }} auto icon={<Show fill="currentColor" filled />} />
          <Spacer x={2} />
          <Button css={{ mt: 10 }} auto icon={<Plus fill="currentColor" set="bold" />}></Button>
        </Row>
      </Card.Body>
    </Card>
  </Grid>
);
}