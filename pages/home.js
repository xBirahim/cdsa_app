import React, { useState } from "react";
import { Grid, Col, Text, Button } from "@nextui-org/react";
import Gradient from "components/Themes";
import NavigationBar from "components/NavigationBar";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const [userKey, setUserKey] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkLocal = () => {
      setUserKey(localStorage.getItem("userKey"));
      console.log(localStorage.getItem("userKey"));
    };
  }, [router.isReady]);
  return (
    <>
      <NavigationBar />
      <Text css={{ display: "flex", justifyContent: "center" }}>
        UHHHHHHHHHHH
      </Text>
      {/* <Button onPress={checkLocal("userKey")}>Check Local Storage</Button> */}
    </>
  );
}
