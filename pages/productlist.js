// Index

import { Grid, Col, Text, Pagination, Container, Row, Spacer } from "@nextui-org/react";
import {GenerateRandomGradient, Gradient} from "components/Themes";
import NavigationBar from "components/NavigationBar";
import { useRouter } from "next/router";
import Product from "components/Product";
import { useEffect, useState } from "react";
import { Service } from "tools/service";


export default function ProductList() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
      const fetchItems = async () => {
        try {
          const response = await Service.get("https://localhost:7063/api/Products");
          setItems(response.data);
          console.log(items);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      };

      fetchItems();
    }, []);

  return (
    <>
      <NavigationBar />
      <Grid.Container
        justify="center"
        css={{
          height: "100%",

        }}
      >
        {/* <Pagination
          justify="center"
          css={{ position: "fixed", bottom: "2%", zIndex: "9999" }}
          noMargin
          shadow
          onlyDots
          size={"xl"}
          total={2}
          onChange={moveTo}
        /> */}
        <Grid id="sub1" xs={20} sm={10}>
          {!isLoading && <Product products={items} />}
        </Grid>
      </Grid.Container>
    </>
  );
}
