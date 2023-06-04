import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Product from "components/product";
import { Badge, Grid, Spacer } from "@nextui-org/react";

export default function Profile() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://615f5fb4f7254d0017068109.mockapi.io/api/v1/products"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(
          "Une erreur s'est produite lors de la récupération des données de l'API:",
          error
        );
      }
    };

    if (router.isReady) {
      getData();
    }
  }, [router.isReady]);

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
    <>
      <Grid.Container gap={2} justify="flex-start">
        {products.map((product) => (
          <Grid xs={6} sm={3} key={product.id}>
            <Product
              text={product.name}
              price={product.details.price}
              description={product.details.description}
              imageLink={product.imageLink}
              onAddToCart={handleAddToCart}
            />
            <Spacer y={2} />
          </Grid>
        ))}
      </Grid.Container>
    </>
  );
}
