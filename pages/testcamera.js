import { Card, Container, Text } from "@nextui-org/react";
import Scanner from "components/Scanner";
import { useEffect, useState } from "react";

export default function CameraTest() {
  return (
    <>
      <Container
        display="flex"
        alignItems="center"
        justify="center"
        css={{ minHeight: "100vh" }}
      >
        <Scanner></Scanner>
      </Container>
    </>
  );
}