import React, { useState, useEffect, useRef } from "react";
import {Gradient} from "components/Themes";
import QrReader from "react-qr-scanner"
import { useRouter } from "next/router";
import {
  Card,
  Grid,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Container,
  Link,
  Modal,
  useInput,
} from "@nextui-org/react";
import { ChevronLeft, Swap } from "react-iconly";
import Scanner from "components/Scanner";
import { Service } from "tools/service";
import axios from "axios";

export default function Login() {

  const router = useRouter();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [authKey, setAuthKey] = useState("");

  const handleScanResult = (result) => {
    // Faites quelque chose avec la valeur du scan
    console.log("Résultat du scan :", result);
    setAuthKey(result["text"]);
    // Autres traitements...
  };

  const login = () => {
    try {
      let passwordData = Service.hashAndSaltPassword(password);
      let url = "https://localhost:7063/api/Dealers/verify"
      let body = {
        email: email,
        password: passwordData.hashedPassword,
        authKey: authKey
      };
      console.log(JSON.stringify(body));
      Service.post(url, body).then((res) => {
        if (res.data != 0 ){
      Service.setCurrentUser(res.data.id);
      router.push("/dealer");
        }else{
          console.log("Bad credentials");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Grid.Container css={{ minHeight: "100vh", bg: Gradient.neutral }}>
        <Container
          display="flex"
          alignItems="center"
          justify="center"
          css={{ minHeight: "100vh" }}
        >
          <Card
css={{ mw: "420px", p: "20px", minHeight: "600px" }}
          >
            {" "}
            <Card.Header>
              <Button
                auto
                color={Gradient.antineutral}
                rounded
                size={"xs"}
                as={Link}
                href="/"
                icon={
                  <ChevronLeft
                    set="bold"
                    primaryColor={Gradient.antineutral}
                    fill="currentColor"
                    filled
                  />
                }
              >
                <Text b size={17}>
                  Back
                </Text>
              </Button>
            </Card.Header>
            <Input
              clearable
              underlined
              fullWidth
              color="success"
              size="lg"
              aria-label="Email"
              placeholder="Email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Spacer y={1} />
            <Input
              underlined
              fullWidth
              color="primary"
              size="lg"
              aria-label="Password"
              placeholder="Password"
              css={{ mb: "6px" }}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Scanner onScanResult={handleScanResult} />
            <Spacer y={1} />
            <Button
              color="default"
              onPress={() => {
            login();
              }}
            >
              Sign in
            </Button>
          </Card>
          <Spacer y={1} />
          
        </Container>
      </Grid.Container>
    </>
  );
}
