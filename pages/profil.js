import React from "react";
import { Avatar, Button, Card, Divider, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

const Profil = () => {
  const router = useRouter();

  // Remplacez ces données factices par les données de votre utilisateur connecté
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://previews.123rf.com/images/asmati/asmati1603/asmati160301350/53564482-vecteur-ligne-utilisateur-ic%C3%B4ne-sur-fond-transparent.jpg",
    // Autres données de profil
  };

  const handleRetourClick = () => {
    router.push("/");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <div style={{ width: "500px" }}>
        <Text style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "20px" }}>Mon profil</Text>
        <Card>
          <Card.Body>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar src={user.avatar} alt="Avatar" width="60px" height="60px" style={{ marginRight: "20px" }} />
              <div>
                <Text h5>{user.name}</Text>
                <Text>{user.email}</Text>
                {/* Autres informations du profil */}
              </div>
            </div>
            <Divider />
            {/* Autres sections d'informations du profil */}
            <Button auto color="brown" onClick={handleRetourClick}>
              Retour vers l'accueil
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Profil;
