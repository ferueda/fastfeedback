import { ChakraProvider } from '@chakra-ui/react';
import { ProvideAuth } from '../services/auth';

import theme from '../theme';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProvideAuth>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ProvideAuth>
  );
}

export default MyApp;
