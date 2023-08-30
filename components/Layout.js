import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import { NextUIProvider, Spacer } from "@nextui-org/react";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <NextUIProvider>
      <Head>
        <title>PayeTonKAWA</title>
        <meta
          name="description"
          content="mspr"
        />
        <link rel="icon" href="https://us.123rf.com/450wm/gorbovoi81/gorbovoi811311/gorbovoi81131100001/23764262-une-tasse-de-caf%C3%A9-fumant-et-des-grains-de-caf%C3%A9-dessin.jpg" />
      </Head>
      <NavigationBar />
      <Spacer y={2} />
      {children}
      <Footer />
      <Spacer y={2} />
    </NextUIProvider>
  );
};

export default Layout;
