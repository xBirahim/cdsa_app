import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Grid, Col, Text } from "@nextui-org/react";
import Gradient from "components/Themes";
import NavigationBar from "components/NavigationBar";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <Grid.Container
        justify="center"
        css={{
          height: "100vh",
          bg: Gradient.neutral,
        }}
      >
        <Grid xs={12} sm={6} alignItems="center">
          <Col css={{ width: "100%" }}>
            <Text weight={"bold"} size={70} css={{ textAlign: "center" }}>
              Paye ton kawa
            </Text>
            <Text weight={"bold"} size={40} css={{ textAlign: "center" }}>
              {"Le café c'est la vie"}
            </Text>
          </Col>
        </Grid>
      </Grid.Container>
    </>
  );
}
