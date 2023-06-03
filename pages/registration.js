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
  const [email, setEmail] = useState("");

  const apicall = async (url) => {
    const { data } = await axios(`${url}`);
    return data;
  };

  const getDate = async (urlLink) => {
    Service.get(urlLink).then((r) => {
      console.log(r.data);
    });
  };

  const sendMail = async (urlLink, body = "TEST MESSAGE") => {
    Service.post(
      urlLink,
      { "Content-Type": "application/json; charset=utf-8" },
      body
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
              clearable
              underlined
              fullWidth
              color="primary"
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
            />
            <Spacer y={1} />
            <Input
              clearable
              underlined
              fullWidth
              color="primary"
              size="lg"
              aria-label="Confirm password"
              placeholder="Confirm password"
              css={{ mb: "6px" }}
              type="password"
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
                // sendMail("https://localhost:7063/api/tool/print", email);
                handler();
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
