import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";



const Layout = ({ children }) => {
  return (
    <NextUIProvider
    defaultTheme="dark">
      <Head>
        <title>MSPR</title>
        <meta name="description" content="mspr" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
        {children} 
      <footer>
        <Footer />
      </footer>
    </NextUIProvider>
  );
};

export default Layout;
