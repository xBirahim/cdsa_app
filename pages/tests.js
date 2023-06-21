import { Container, Spacer } from "@nextui-org/react";
import Cart from "components/Cart";
import Scanner from "components/Scanner";
import UserTable from "components/UserTable";
import { useEffect, useState } from "react";

export default function Tests() {

  const testList = [
    { id: 1, name: "xxx", surname:"diop"},
    { id: 2, name: "yyy", surname:"dia" },
    { id: 3, name: "aaa", surname:"dioum" },
    { id: 4, name: "mmm", surname:"diallo" },
    { id: 5, name: "xxx", surname:"diop"},
    { id: 6, name: "yyy", surname:"dia" },
    { id: 7, name: "aaa", surname:"dioum" },
    { id: 8, name: "mmm", surname:"diallo" },
  ];

  const handleScanResult = (result) => {
    // Faites quelque chose avec la valeur du scan
    console.log("Résultat du scan :", result["text"]);
    // Autres traitements...
  };


  return (
    <>
      <Container
        display="flex"
        alignItems="center"
        justify="center"
        css={{ minHeight: "100vh" }}
      >
        {/* <Scanner onScanResult={handleScanResult}></Scanner>
        <Spacer x={2}/>
        <UserTable users={testList}></UserTable> */}
        <Cart/>
      </Container>
    </>
  );
}
