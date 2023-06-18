import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Badge, Grid, Spacer } from "@nextui-org/react";
import Product from "components/product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { data } from "components/test";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();
  //products = data;
/*
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

    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, [router.isReady]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    console.log("Panier mis à jour :", cartItems);
  }, [cartItems]);
*/
  const handleAddToCart = (item, id) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === id);
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
      toast.success(`Article "${item.text}" ajouté au panier !`);
      console.log("Produit ajouté :", item);
      console.log("Panier mis à jour :", cartItems);
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1, id }]);
      toast.success(`Article "${item.text}" ajouté au panier !`);
      console.log("Produit ajouté :", item);
      console.log("Panier mis à jour :", cartItems);
    }
  };

  return (
    <>
      <Grid.Container gap={2} justify="flex-start">
        {data.map((product) => (
          <Grid xs={6} sm={3} key={product.id}>
            <Product
              text={product.name}
              price={product.details.price}
              description={product.details.description}
              imageLink={product.imageLink}
              onAddToCart={(item) => handleAddToCart(item, product.id)}
            />
            <Spacer y={2} />
          </Grid>
        ))}
      </Grid.Container>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
    </>
  );
};

export function getProducts() {
  return products;
}
export default ProductList;
