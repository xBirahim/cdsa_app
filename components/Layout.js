import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import { NextUIProvider, Spacer } from "@nextui-org/react";
import Head from "next/head";

const Layout = ({ children }) => {

  return (
    <NextUIProvider>
      <Head>
        <title>MSPR</title>
        <meta
          name="description"
          content="mspr"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
