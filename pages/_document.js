import { Html, Head, Main, NextScript } from "next/document";
import { CssBaseline } from '@nextui-org/react';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {CssBaseline.flush()}
        {/* <link rel="manifest" href="/manifest.json" /> */}
        <link rel="apple-touch-icon" href="/icon.png"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
