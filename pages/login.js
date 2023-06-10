import React, { useRef, useState } from "react";
import Gradient from "components/Themes";
import axios from "axios";
import axiosRetry from "axios-retry";
import { QrReader } from "react-qr-reader";
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
import { Authentication } from "tools/authentication";
import { ChevronLeft, Swap } from "react-iconly";

export default function Login() {
  const router = useRouter();

  axiosRetry(axios, { retries: 5 });
  // Exponential back-off retry delay between requests
  axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

  const [startScan, setStartScan] = useState(false);
  const [scanResult, setScanResult] = useState("");
  const [cameraSelected, setCameraSelected] = useState("user");

  const closeCameraHandler = () => {
    setStartScan(false);
    console.log("closed");
    console.log(Authentication.getUser(), "user");
    router.push(`/home`);
  };

  const switchCamera = () => {
    switch (cameraSelected) {
      case "environment":
        setCameraSelected("user");
        break;
      case "user":
        setCameraSelected("environment");
        break;
      default:
        break;
    }
  };

  const closeCamx = async () => {
    ref.current.stopCamera();
  };

  const closeCam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    // the rest of the cleanup code
    window.location.reload();
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
                color="error"
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
              ></Button>
              <Text id="modal-scan" b size={24} css={{ as: "center" }}>
                Scan your QR Code
              </Text>
            </Card.Header>
            <Button
              css={{ minHeight: 30, maxWidth: 60, as: "center" }}
              onPress={() => {
                setStartScan(!startScan);
              }}
            >
              {startScan ? "Stop Scan" : "Start Scan"}
            </Button>
            <Card.Body css={{ minHeight: 200, minWidth: 200 }}>
              {startScan && (
                <>
                  <QrReader
                    // facingMode={cameraSelected}
                    delay={1000}
                    onError={handleScanError}
                    onScan={handleScan}
                    onResult={handleScan}
                    style={{ width: "100vh" }}
                  />
                  <Button
                    rounded
                    auto
                    color="error"
                    size={"xs"}
                    icon={<Swap set="bold" primaryColor="blueviolet" />}
                    onPress={switchCamera}
                  ></Button>
                </>
              )}
            </Card.Body>
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
          </Card>
        </Container>
      </Grid.Container>
    </>
  );
}
