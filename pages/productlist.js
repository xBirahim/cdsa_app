import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Product from "components/product"
import { Badge, Grid, Spacer } from "@nextui-org/react";

export default function Profile() {

  const list = [
    {
      title: "Orange",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      price: "$3.00",
    },
    {
      title: "Cherry",
      price: "$10.00",
    },
    {
      title: "Lemon",
      price: "$5.30",
    },
    {
      title: "Avocado",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      price: "$8.00",
    },
    {
      title: "Banana",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      price: "$12.20",
    },
  ];
  
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {

    };

    if (router.isReady) {
      getData();
    }

  }, [router.isReady]);

  return (
    <>
      <Grid.Container gap={2} justify="flex-start">
        {list.map((item, index) => (
          <Grid xs={6} sm={3} key={index}>
            <Badge content="new" css={{bg: "red"}}>
            <Product text={item.title} price={item.price}/>
            </Badge>
            <Spacer y={2}/>
          </Grid>
          
        ))}
      </Grid.Container>
    </>
  );
}
