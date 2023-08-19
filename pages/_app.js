import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux'; // Import du Provider de React-Redux
import store from 'components/store'; // Chemin vers votre store Redux
import Layout from 'components/Layout';
import 'styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </Provider>
  );
}
