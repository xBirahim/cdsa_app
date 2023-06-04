import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Test = () => {
  // DECLARATION DE VARIABLES
  const [customers, setCustomers] = useState([]);

  // DECLARATION DU ROUTEUR
  const router = useRouter();

  // USE EFFECT
  useEffect(() => {
    const getData = async () => {
      // Récupérer les données des clients depuis une API par exemple
      const response = await fetch("https://615f5fb4f7254d0017068109.mockapi.io/api/v1/customers");
      const data = await response.json();
      setCustomers(data);
    };

    if (router.isReady) {
      getData();
    }
  }, [router.isReady]);

  // Développement de l'UI de la page
  const renderCustomers = customers.map((customer) => (
    <li key={customer.id}>{customer.name}</li>
  ));

  const page = (
    <>
      <h1>Liste des clients</h1>
      <ul>{renderCustomers}</ul>
    </>
  );

  // RENDU DE LA PAGE
  return page;
};

