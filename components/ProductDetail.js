import { Rating } from "@geist-ui/core";
import { Container, Grid, Text, Image, Badge, Collapse, Spacer, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Service } from "tools/service";

export default function ProductDetail({ product }) {
  const [selectedItem, setSelectedItem] = useState();
  const [dealer, setDealer] = useState();

  useEffect(() => {
    getItemData(product);
    console.log(selectedItem?.averageRating, "avg");
  }, [product]);

  const getItemData = (id) => 
  {
    Service.get(`https://localhost:7063/api/Products/${id}`).then((res) => {
      setSelectedItem(res.data);
    });    
  };

  return (
    <Container>
      <Grid.Container justify="center">
        <Grid xs={12} md={6} css={{ height: "300px" }}>
          {selectedItem?.model3D != null ? (
            <iframe
              src={selectedItem.model3D}
              frameborder="0"
              width="100%"
              height="100%"
            ></iframe>
          ) : (
            <Image
              src={selectedItem?.image}
              alt={selectedItem?.name}
              width="100%"
            />
          )}
        </Grid>

        <Container xs={12} md={6}>
          <Grid>
            <Text h2>{selectedItem?.name}</Text>
            <Badge color="primary" variant="bordered">
              {selectedItem?.category}
            </Badge>
            <Spacer y={1}/>
            <Text h4>Price: $ {selectedItem?.price}</Text>
            <Rating
              locked={true}
              value={
                selectedItem?.averageRating ? selectedItem.averageRating : 0
              }
            />
          </Grid>
          <Spacer y={1} />
          <Collapse title="Description">
            <Text>{selectedItem?.description}</Text>
          </Collapse>
          <Collapse title="Details">
            <Text>{selectedItem?.description}</Text>
          </Collapse>
        </Container>
      </Grid.Container>
      <Spacer y={2} />
      <Grid.Container justify="center" css={{}}>
        <Button justify="center" css={{ justify: "center" }} color={"gradient"} auto>
          Add To Cart
        </Button>
      </Grid.Container>
    </Container>
  );
};
