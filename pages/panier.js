import React, { useState } from "react";

const Panier = () => {
  const [cartItems, setCartItems] = useState([]);

  if (cartItems.length === 0) {
    return <p>Aucun article dans le panier</p>;
  }

  return (
    <div>
      <h1>Panier</h1>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Panier;
