import { Card, Container, Text } from "@nextui-org/react";
import Gradient from "components/Themes";
import { QrReader } from "react-qr-reader";
import { useEffect, useState } from "react";

export default function CameraTest() {
  const [scanResult, setScanResult] = useState("");

//   //Gestion de la caméra
//   // Initializing values
//   let isPlaying = true;

//   // On video playing toggle values
//   video.onplaying = function () {
//     isPlaying = true;
//   };

//   // On video pause toggle values
//   video.onpause = function () {
//     isPlaying = false;
//   };

//   // Play video function
//   const playVid = async () => {
//     if (video.paused && !isPlaying) {
//       return video.play();
//     }
//   }

//   // Pause video function
//   const pauseVid = () => {
//     if (!video.paused && isPlaying) {
//       video.pause();
//     }
//   }

  const handleScan = (result) => {
    if (result) {
      setScanResult(result);
      console.log(result);
    }
  };
  //Gestion de la caméra

  const handleScanError = (error) => {
    console.log(error);
  };

  return (
    <>
      <Container
        display="flex"
        alignItems="center"
        justify="center"
        css={{ minHeight: "100vh" }}
      >
        <Card height={100} width={100} css={{ maxHeight: 800, maxWidth: 400 }}>
          <Card.Header>
            <Text b size={30}>
              Scan the QR Code
            </Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body css={{ minHeight: 200, minWidth: 200 }}>
            <QrReader
              scanDelay={300}
              onError={handleScanError}
              onScan={handleScan}
              onResult={handleScan}
            />
          </Card.Body>
          <Card.Footer>
            <Text b size={24}>
              Result: {`${scanResult}`}
            </Text>
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
}
