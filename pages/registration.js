import React, { useState } from "react";
import {
  Card,
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
import Gradient from "components/Themes";
import { ChevronLeft } from "react-iconly";
import axios from "axios";
import axiosRetry from "axios-retry";
import { Service } from "tools/service";
import Camera from "./camera";

export default function Registration() {
  axiosRetry(axios, { retries: 5 });
  // Exponential back-off retry delay between requests
  axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });
  // MAIL ET API
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("")

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    return `${year}${month}${day}${hour}${min}${sec}`;
  };

  const getDate = async (urlLink) => {
    Service.get(urlLink).then((r) => {
      console.log(r.data);
    });
  };

  const sendMail = async (urlLink, body) => {
    Service.post(
      urlLink,
      { "Content-Type": "application/json; charset=utf-8" },
      JSON.stringify(body)
    ).then((r) => {
      console.log(r.data);
    });
  };

  // CAMERA

  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  // Validation du mail

  const { value, reset, bindings } = useInput("");
  
  const validateEmail = (value) => {   
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  // const helper = React.useMemo(() => {
  //   if (!value) {
  //     return {
  //       text: "",
  //       color: "",
  //     };
  //   }
  //   const isValid = validateEmail(value);
  //   return {
  //     text: isValid ? "" : "Enter a valid email",
  //     color: isValid ? "success" : "error",
  //   };
  // }, [value]);

  // // Validation du mot de passe

  // const validatePassword = (password) => {
  //   // Vérifiez si le mot de passe a au moins 8 caractères, une majuscule et un caractère spécial
  //   const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  //   return passwordRegex.test(password);
  // };

  // Hash du mot de passe

  const hashAndSaltPassword = (password) => {
    setPasswordConfirm(password);
  };

  return (
    <>
      <div>
        <Container
          display="flex"
          alignItems="center"
          justify="center"
          css={{ minHeight: "100vh", bg: Gradient.neutral }}
        >
          <Card css={{ mw: "420px", p: "20px" }} isHoverable>
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
                mb: "20px",
              }}
            >
              Registration
            </Text>
            <Input
              // {...bindings}
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
              clearable
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
              clearable
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
            <Spacer y={2} />
            <Row justify="space-between">
              <Checkbox>
                <Text size={14}>Remember me</Text>
              </Checkbox>
              <Text size={14}>Forgot password?</Text>
            </Row>
            <Spacer y={1} />
            <Button
              color={Gradient.antineutral}
              onPress={() => {
                // getDate("https://localhost:7063/api/tool/date");

                if (validateEmail(email)) {
                  sendMail(
                    "https://localhost:7063/api/tool/print",
                    JSON.stringify({
                      mail: email,
                      key: getCurrentDate(),
                      passwordHash: password
                    })
                  );
                  handler();
                }
              }}
            >
              Sign in
            </Button>
            <Modal
              closeButton
              aria-labelledby="modal-title"
              open={visible}
              onClose={closeHandler}
            >
              <Modal.Body>
                <Text b size={40} justify={"center"}>
                  CAMERA
                </Text>
              </Modal.Body>
              <Modal.Footer>
                <Button auto flat color="error" onPress={closeHandler}>
                  Close
                </Button>
                <Button auto onPress={closeHandler}>
                  Sign in
                </Button>
              </Modal.Footer>
            </Modal>
          </Card>
        </Container>
      </div>
    </>
  );
}
