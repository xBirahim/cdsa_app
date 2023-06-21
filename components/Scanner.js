import React, { Component } from "react";
import { Card, Button, Container, Grid } from "@nextui-org/react";
import QrReader from "react-qr-scanner";
import { Camera, Scan } from "react-iconly";

class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startScan: false,
      scanResult: "",
      cameraSelected: "user",
    };
  }

  switchCamera = () => {

    console.log(this.state.cameraSelected);

    switch (this.state.cameraSelected) {
      case "user":
        this.setState({cameraSelected: "environment"})
        break;
      case "environment":
        this.setState({cameraSelected: "user"})
        break;
    
      default:
        break;
    }

  }

  handleScan = (result) => {
    if (result) {
      this.setState({ scanResult: result, startScan: false });
      // Appel de la fonction onScanResult avec la valeur du scan
      if (typeof this.props.onScanResult === "function") {
        this.props.onScanResult(result);
      }
    }else{
      console.log("Scan error");
    }
  };

  handleScanError = (error) => {
    console.log(error);
  };

  handleScannerLoad = (scanner) => {
    if (scanner) {
      scanner.start();
    }
  };

  handleScannerUnload = (scanner) => {
    if (scanner) {
      scanner.stop();
    }
  };

  render() {
    const { startScan } = this.state;

    return (
      <>
        <Grid.Container
          justify="center"
          css={{
            height: "400px",
            width: "400px",
            minHeight: "200px",
            minWidth: "200px",
          }}
        >
          <Card.Header></Card.Header>
          <Button
            auto
            css={{ minHeight: 30, maxWidth: 30, as: "center" }}
            icon={<Scan set="bold" />}
            onPress={() => {
              this.setState((prevState) => ({
                startScan: !prevState.startScan,
              }));
            }}
          >
            {startScan ? "Stop" : "Start"}
          </Button>
          <Card.Body css={{ minHeight: 200, minWidth: 200 }}>
            {startScan && (
              <QrReader
                constraints={{
                  audio: false,
                  video: { facingMode: this.state.cameraSelected },
                }}
                onScan={this.handleScan}
                onError={this.handleScanError}
                onLoad={this.handleScannerLoad}
                onUnload={this.handleScannerUnload}
                style={{ width: "100%" }}
              />
            )}
          </Card.Body>
          {/* <Card.Divider hidden={!this.state.startScan} />
          <Card.Footer>
            {startScan && (
              <Container display="flex" alignItems="center" justify="center">
                <Button
                  onPress={this.switchCamera}
                  icon={<Camera set="bold" />}
                />
              </Container>
            )}
          </Card.Footer> */}
        </Grid.Container>
      </>
    );
  }
}

export default Scanner;
