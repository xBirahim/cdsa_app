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
} from "@nextui-org/react";
import Gradient from "components/Themes";
import { ChevronLeft } from "react-iconly";

export default function registration() {
  const [email, setEmail] = useState("");

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
              onPress={(e) => {
                console.log(email);
              }}
            >
              Sign in
            </Button>
          </Card>
        </Container>
      </div>
    </>
  );
}
