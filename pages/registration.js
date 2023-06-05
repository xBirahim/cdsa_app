import React, { useEffect, useRef, useState } from "react";
import Gradient from "components/Themes";
import { ChevronLeft } from "react-iconly";
import axios from "axios";
import axiosRetry from "axios-retry";
import { Service } from "tools/service";
import { QrReader } from "react-qr-reader";
import { Router, useRouter } from "next/router";
import Camera from "./camera";
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
  const [scanResult, setScanResult] = useState("");
  const [startScan, setStartScan] = useState(false);
  const [showScanPopup, setShowScanPopup] = useState(false);

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

  const senfConfirmationMail = async (urlLink, body) => {
    Service.post(
      urlLink,
      { "Content-Type": "application/json; charset=utf-8" },
      JSON.stringify(body)
    ).then((r) => {
      console.log(r.data);
    });
  };

  const validateEmail = (value) => {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  const hashAndSaltPassword = (password) => {
    setPasswordConfirm(password);
  };

  // Camera

    const closeCameraHandler = () => {
      setStartScan(false);
      setShowScanPopup(false);
      console.log("closed");
      localStorage.setItem("userKey", "xxx");
      router.push(`/home`);
    };

  const handleScan = (result) => {
    if (result) {
      setScanResult(result);
      console.log(result);
      closeCameraHandler();
    }
  };

  const handleScanError = (error) => {
    console.log(error);
  };

  return (
    <>
      <Grid.Container css={{ minHeight: "100vh", bg: Gradient.neutral }}>
        <Container display="flex" alignItems="center" justify="center">
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
              <Text color="primary" size={14} as={Link} href="#">
                Forgot password?
              </Text>
            </Row>
            <Spacer y={1} />
            <Button
              color="default"
              onPress={() => {
                // getDate("https://localhost:7063/api/tool/date");

                if (validateEmail(email)) {
                  senfConfirmationMail(
                    "https://localhost:7063/api/tool/print",
                    JSON.stringify({
                      mail: email,
                      key: getCurrentDate(),
                      passwordHash: password,
                    })
                  );
                  setShowScanPopup(true);
                }
              }}
            >
              Sign in
            </Button>
            <Modal
              closeButton
              aria-labelledby="modal-scan"
              open={showScanPopup}
              onClose={closeCameraHandler}
              preventClose
            >
              <Modal.Header>
                <Container
                  display="flex"
                  alignItems="center"
                  justify="center"
                  css={{ minHeight: "100vh" }}
                >
                  <Card
                    height={100}
                    width={100}
                    css={{ maxHeight: 400, maxWidth: 400 }}
                  >
                    <Card.Header>
                      <Text id="modal-scan" b size={24} css={{ as: "center" }}>
                        Scan the QR Code
                      </Text>
                    </Card.Header>
                    <Button
                      css={{ minHeight: 30, maxWidth: 60, as: "center" }}
                      onClick={() => {
                        setStartScan(!startScan);
                      }}
                    >
                      {startScan ? "Stop Scan" : "Start Scan"}
                    </Button>

                    <Card.Body css={{ minHeight: 200, minWidth: 200 }}>
                      {startScan && (
                        <QrReader
                          delay={1000}
                          onError={handleScanError}
                          onScan={handleScan}
                          onResult={handleScan}
                          style={{ width: "100vh" }}
                        />
                      )}
                    </Card.Body>
                  </Card>
                </Container>
              </Modal.Header>
            </Modal>
          </Card>
        </Container>
      </Grid.Container>
    </>
  );
}
