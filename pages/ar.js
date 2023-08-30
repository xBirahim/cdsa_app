import React, { useEffect, useState } from "react";
import { Grid, Spacer } from "@nextui-org/react";
import Mac from "components/Mac"; // Import the Mac component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "components/actions"; // Import your addToCart action
import Link from "next/link";

const MacPage = () => {
  const [mac, setMac] = useState([]); // Use an array to store Mac products
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotal);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://64db34f5593f57e435b0a0ac.mockapi.io/api/mac" // Replace with your API URL
        );
        const data = await response.json();
        setMac(data);
      } catch (error) {
        console.log("An error occurred while fetching API data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`Item "${item.name}" added to the cart!`);
  };

  return (
    <>
      <Grid.Container gap={2} justify="flex-start">
        {mac.map((macProduct) => (
          <Grid xs={6} sm={3} key={macProduct.id}>
            <Mac
              text={macProduct.name}
              price={macProduct.price}
              imageLink={macProduct.image}
              name={macProduct.name}
              onAddToCart={() => handleAddToCart(macProduct)}
              id={macProduct.id}
            />
            <Spacer y={2} />
          </Grid>
        ))}
      </Grid.Container>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default MacPage;
