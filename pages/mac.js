import React, { useEffect, useState } from "react";
import { Grid, Spacer } from "@nextui-org/react";
import Product from "components/product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "components/actions"; // Make sure to correct the path to your actions file
import Link from "next/link";

const Mac = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotal);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://64db34f5593f57e435b0a0ac.mockapi.io/api/products/m1" // Replace with your API URL
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log("An error occurred while fetching API data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(` "${item.name}" added to the cart!`);
  };

  return (
    <>
      <Grid.Container gap={2} justify="flex-start">
        {products.map((product) => (
          <Grid xs={6} sm={3} key={product.id}>
            <Product
              text={product.name}
              price={product.price}
              description={product.description}
              imageLink={product.image}
              onAddToCart={() => handleAddToCart(product)}
            />
            <Spacer y={2} />
          </Grid>
        ))}
      </Grid.Container>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default Mac;
