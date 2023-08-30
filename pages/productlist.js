import React, { useEffect, useState } from "react";
import { Grid, Spacer } from "@nextui-org/react";
import Product from "components/product";
import ARScene from "components/ARScene"; // Importez le composant ARScene
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "components/actions";
import Link from "next/link";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotal);
  const [isARActive, setIsARActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://64db34f5593f57e435b0a0ac.mockapi.io/api/products/p1"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`"${item.name}" à été ajouté au panier!`);
  };

  const activateAR = () => {
    setIsARActive(true);
  };

  return (
    <div>
      <Grid.Container gap={2} justify="flex-start">
        {products.map((product) => (
          <Grid xs={6} sm={3} key={product.id}>
            <Product
              text={product.name}
              price={product.price}
              description={product.description}
              imageLink={product.img}
              onAddToCart={() => handleAddToCart(product)}
              isARActive={isARActive}
              activateAR={activateAR}
            />
            {isARActive && <ARScene />} {/* Afficher ARScene si la réalité augmentée est active */}
            <Spacer y={2} />
          </Grid>
        ))}
      </Grid.Container>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ProductList;
