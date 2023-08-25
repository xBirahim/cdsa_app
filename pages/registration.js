import React, { useEffect, useRef, useState } from "react";
import {Gradient} from "components/Themes";
import { ChevronLeft } from "react-iconly";
import axios from "axios";
import axiosRetry from "axios-retry";
import { Service } from "tools/service";
import { QrReader } from "react-qr-scanner";
import { Router, useRouter } from "next/router";
import cryptoJs from "crypto-js";
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
  Badge,
} from "@nextui-org/react";

export default function Registration() {
  const router = useRouter();

  axiosRetry(axios, { retries: 5 });
  // Exponential back-off retry delay between requests
  axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });
  // MAIL ET API
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isDealer, setIsDealer] = useState(false);

  const sendConfirmationMail = async (urlLink, body) => {
    Service.post(
      urlLink,
      { "Content-Type": "application/json; charset=utf-8" },
      JSON.stringify(body)
    ).then((r) => {
      console.log(r.data);
    });
  };

  const createDealer = async (urlLink, body) => {
    console.log(JSON.stringify(body));
    Service.post(
      urlLink,
      JSON.stringify(body)
    ).then((r) => {
      Service.setCurrentUser(r.data);
      router.push("/dealer")
    });

  };

  const createCustomers = async (urlLink, body) => {
    console.log(JSON.stringify(body));
    Service.post(
      urlLink,
      JSON.stringify(body)
    ).then((r) => {
      Service.setCurrentUser(r.data);
      router.push("/productlist")
    });

  };


  const createUser = async (urlLink, body) => {
    Service.post(
      urlLink,
      { "Content-Type": "application/json; charset=utf-8" },
      JSON.stringify(body)
    ).then((r) => {
      console.log(r.data);
    });

    if (isDealer) {
      //Envoyer un mail de confirmation
    }
  };

  const validateEmail = (value) => {
    if (value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)) {
      console.log("Mail: OK");
      return true;
    } else {
      return false;
    }
  };

  const validatePassword = (value) => {
    // Vérifier si le texte a au moins 8 caractères
    if (value.length < 8) {
      return false;
    }
    console.log("Mot de passe: OK");
    return true;
  }; 

  const validatePhoneNumber = (value) => {
    if (value.length < 8 || value.length > 10) {
      return false;
    }

    return true;
  };

  const checkInfo = () => {
    if (
      validateEmail(email) &&
      validatePassword(password) &&
      validatePhoneNumber(phone)
    ) {
      if (!isDealer) {
              return true
            }
      else if (company.length != 0) {
                return true
              }
    }else{
      return false
    }
  };

  return (
    <>
      <Grid.Container css={{ minHeight: "100vh", bg: Gradient.neutral }}>
        <Container display="flex" alignItems="center" justify="center">
          <Card
            css={{ mw: "420px", p: "20px", minHeight: "600px", maxHeight: "800px"}}
            isHoverable
          >
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
            <Text
              size={24}
              weight="bold"
              css={{
                as: "center",
              }}
            >
              Registration
            </Text>
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
            <Spacer y={1} />
            <Input
              underlined
              fullWidth
              color="error"
              size="lg"
              aria-label="Confirm password"
              placeholder="Confirm password"
              css={{ mb: "6px" }}
              type="password"
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
            />
            <Spacer y={1.5} />
            <Grid>
              <Input
                underlined
                fullWidth
                size="lg"
                labelPlaceholder="Username"
                aria-label="Username"
                css={{ mb: "6px" }}
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <Spacer y={1.5} />
              <Input
                underlined
                fullWidth
                size="lg"
                labelPlaceholder="Name"
                aria-label="Name"
                css={{ mb: "6px" }}
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Spacer y={1.5} />
              <Input
                underlined
                fullWidth
                size="lg"
                labelLeft="+33"
                aria-label="PhoneNumber"
                css={{ mb: "6px" }}
                type="number"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <Spacer y={1.5} />
              {isDealer && (
                <Input
                  underlined
                  fullWidth
                  size="lg"
                  labelLeft="Company"
                  aria-label="Company"
                  css={{ mb: "6px" }}
                  type="text"
                  onChange={(e) => {
                    setCompany(e.target.value);
                  }}
                />
              )}
            </Grid>

            <Row justify="space-between">
              <Checkbox>
                <Text size={14}>Remember me</Text>
              </Checkbox>
              <Text
                color="primary"
                size={14}
                as={Button}
                light
                onPress={(e) => {
                  setIsDealer(!isDealer);
                }}
              >
                {isDealer ? "Je suis revendeur" : "Je suis client"}
              </Text>
            </Row>
            <Spacer y={1} />
            <Button
                color="primary"
                size={14} 
                as={Button}
                light
                onPress={() => {
                // getDate("https://localhost:7063/api/tool/date");

                if (checkInfo()) {
                  {
                    const passwordData = Service.hashAndSaltPassword(password);
                    const body = {
                      mail: email, 
                      passwordHash: passwordData.hashedPassword,
                      salt: passwordData.salt,
                      username: username,
                      address: address,
                      phone: phone,
                      isDealer: isDealer,
                      company: company,
                    };
                    // sendConfirmationMail(
                    //  "https://localhost:7063/api/tool/print",
                    //</Card>   JSON.stringify(body)
                    // );

                    isDealer
                      ? createDealer(
                          "https://64e3bc10bac46e480e7923a0.mockapi.io/revendeur",
                          {	
                            name: name,
                            username: username,
                            email: email,
                            passwordHash: passwordData.hashedPassword,
                            phone: phone,
                            company: company,
                          } 
                        )
                      : console.log("Dealer");
                  }
                } else {
                    !(isDealer)
                    ? createCustomers(
                    "https://64e3bc10bac46e480e7923a0.mockapi.io/clients",
                    {	
                      name: name,
                      username: username,
                      email: email,
                      passwordHash: passwordData.hashedPassword,
                      phone: phone,
                    })
                    : console.log("Customer");
                }
              }}
            >
                
              Sign in
            </Button>
          </Card>
        </Container>
      </Grid.Container>
    </>
  );
}