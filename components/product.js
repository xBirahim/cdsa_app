import { useMemo, useState } from 'react';
import {  Modal, useModal, Grid, Container, Card, Text, Spacer, Button, Row, Image, Checkbox } from "@nextui-org/react";
import { Plus, Show } from "react-iconly";
import { Service } from 'tools/service';
import ProductDetail from './ProductDetail';


export default function Product({ products }) {

  const [selectedItem, setSelectedItem] = useState();
  const [showDetails, setShowDetails] = useState("false");

  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const getElementById = (data, targetId) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === targetId) {
        return data[i];
      }
    }
    return null;
  }

  const getItemData = (id) => {
    Service.get(`https://localhost:7063/api/Products/${id}`).then((res) => {
      setSelectedItem(res.data);
    });
  }

  const productCards = useMemo(
    () =>
      products.map((product) => (
        <Grid xs={10} key={product.id}>
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
                {product.image ? (
                  <Image
                    css={{ maxH: "200px" }}
                    src={product.image}
                    width="100%"
                    height="100%"
                  />
                ) : (
                  <iframe
                    src={product.model3D}
                    width="100%"
                    height="100%"
                  ></iframe>
                )}
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
                <Button
                  css={{ mt: 10 }}
                  auto
                  icon={<Show filled />}
                  onPress={() => {
                    // console.log("Show Modal for ", product.id);
                    setSelectedItem(product.id)
                    setShowDetails(true);
                    handler();
                  }}
                />
                <Spacer x={2} />
                <Button css={{ mt: 10 }} auto icon={<Plus filled />}></Button>
              </Row>
            </Card.Body>
          </Card>
        </Grid>
      )),
    [products]
  );

  return (
    <Container>
      <Grid.Container gap={2} justify="center">
        {productCards}
        <Modal
          closeButton
          fullScreen
          blur
          scroll
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
        >
          <ProductDetail product={selectedItem}/>
        </Modal>
      </Grid.Container>
    </Container>
  );
}
