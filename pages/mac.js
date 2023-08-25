import React, { useEffect, useState } from "react";
import { Grid, Spacer } from "@nextui-org/react";
import Product from "components/product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "components/actions"; // Assurez-vous de corriger le chemin de votre fichier d'actions
import Link from "next/link"; // Importez le composant Link depuis Next.js

const mac = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotal);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://64db34f5593f57e435b0a0ac.mockapi.io/api/products/m1" // Remplacez par l'URL de votre API
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

    fetchData();
  }, []);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`Article "${item.name}" ajouté au panier !`);
  };
  return (
    <>
          <Link href="/panier"> {/* Remplacez "/panier" par le chemin de votre page Panier.js */}
          <button>Accéder au panier</button>
      </Link>
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

export default mac;
