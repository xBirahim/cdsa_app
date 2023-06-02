import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Image } from '@nextui-org/react';
import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Container,
} from '@nextui-org/react';

export default function Profile() {

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {

    };

    if (router.isReady) {
      getData();
    }

  }, [router.isReady]);

  return (
    <div css={{ backgroundColor: "#4A2511"}}>
      <Image
      width={150}
      height={150}
      src='https://static.vecteezy.com/ti/vecteur-libre/p3/585577-tasse-a-cafe-logo-template-vector-icon-design-gratuit-vectoriel.jpg'
      alt="DefaultImage"
      css={{ marginTop: '-70px'}}
    />
      <Container display="flex" alignItems="center" justify="center" css={{ marginTop: '-155px'}}>
        <Card css={{ mw: '420px', p: '20px' }}>
          <Text size={24}  weight="bold" css={{ as: 'center', mb: '20px' }}> LOG IN </Text>         
          <Spacer y={1} />
          <Input clearable bordered fullWidth color="primary" size="lg" placeholder="Email"/>
          <Spacer y={1} />
          <Input clearable bordered fullWidth color="primary" size="lg" placeholder="Password"/>
          <Spacer y={1} />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
          <Spacer y={1} />
          <Button css={{ backgroundColor: "blue", border:"gradient" }}>Sign in</Button>
        </Card>
      </Container>
    </div>
  );
}
