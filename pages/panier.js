import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Divider, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { removeFromCart } from "../components/actions"; // Assurez-vous de corriger le chemin de votre fichier d'actions

const Panier = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotal);

  const handleContinuerAchatsClick = () => {
    router.push("/productlist");
  };

  const handleContinuezLivraisonClick = () => {
    router.push("/livraison");
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <div style={{ width: "500px" }}>
        <Text b style={{ marginLeft: "8px" }}>
          Mon panier
        </Text>

        <Card>
          <Card.Body>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item, index) => (
                  <div key={index}>
                    <Text>{item.name}</Text>
                    <Text>{'Prix: ${item.price} €'}</Text>
                    <Button auto color="error" onClick={() => handleRemoveFromCart(item)}>
                      Supprimer
                    </Button>
                    <Divider />
                  </div>
                ))}
                <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
                  <Text style={{ fontSize: "14px", color: "#5d5d5d" }}>
                    Vous avez ajouté {cartItems.length} article(s) récemment.
                  </Text>
                </div>
              </>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
                <Text style={{ fontSize: "14px", color: "#5d5d5d" }}>Il n'y a plus d'articles dans votre panier.</Text>
              </div>
            )}

            {cartTotal !== undefined && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <Text style={{ fontSize: "18px", fontWeight: "bold" }}>Total TTC</Text>
                <Text style={{ fontSize: "18px", fontWeight: "bold" }}>{cartTotal.toFixed(2)} €</Text>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <Button auto color="brown" onClick={handleContinuerAchatsClick}>
                Continuer mes achats
              </Button>
              <Button auto color="brown" onClick={handleContinuezLivraisonClick}>
                Continuez vers la livraison
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
export default Panier;
