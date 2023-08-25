import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Divider, Text, Modal } from "@nextui-org/react";
import { useRouter } from "next/router";
import { removeFromCart } from "../components/actions"; // Assurez-vous de corriger le chemin de votre fichier d'actions

const PanierModal = ({ closeModal }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotal);

  const handleContinuerAchatsClick = () => {
    closeModal();
    router.push("/productlist");
  };

  const handleContinuezLivraisonClick = () => {
    closeModal();
    router.push("/livraison");
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <Modal open={true} onClose={closeModal} aria-labelledby="modal-title">
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Mon panier
        </Text>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item, index) => (
              <div key={index}>
                <Text>{item.name}</Text>
                <Text>{`Prix: ${item.price} €`}</Text>
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
          <Button auto color="white" onClick={handleContinuerAchatsClick}>
            Continuer mes achats
          </Button>
          <Button auto color="white" onClick={handleContinuezLivraisonClick}>
            Continuez vers la livraison
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PanierModal;
