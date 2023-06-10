import React, { useState, useEffect, useRef } from "react";
import Gradient from "components/Themes";
import axios from "axios";
import axiosRetry from "axios-retry";
import QrScanner from "react-qr-scanner";
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

export default function Login() {
  const router = useRouter();

  axiosRetry(axios, { retries: 5 });
  // Exponential back-off retry delay between requests
  axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

  const [startScan, setStartScan] = useState(false);
  const [scanResult, setScanResult] = useState("");

  const closeCameraHandler = () => {
    setStartScan(false);
    console.log("closed");
    console.log(Authentication.getUser(), "user");
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

  const handleScannerLoad = (scanner) => {
    if (scanner) {
      scanner.start();
    }
  };

  const handleScannerUnload = (scanner) => {
    if (scanner) {
      scanner.stop();
    }
  };

  return (
    <>
      <Grid.Container css={{ minHeight: "100vh", bg: Gradient.neutral }}>
        <Container display="flex" alignItems="center" justify="center">
          <Card css={{ mw: "420px", p: "20px" }} isHoverable>
            <Card.Header>
              <Text id="modal-scan" b size={24} css={{ as: "center" }}>
                Scan your QR Code
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
                <QrScanner
                  onScan={handleScan}
                  onError={handleScanError}
                  onLoad={handleScannerLoad}
                  onUnload={handleScannerUnload}
                  style={{ width: "100%" }}
                />
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
