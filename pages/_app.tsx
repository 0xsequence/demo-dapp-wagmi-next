import '../styles/global.css';
import type { AppProps } from 'next/app';
import WagmiProvider from '../components/WagmiProvider';

import {
  ThemeProvider,
} from '@0xsequence/design-system'

import '@0xsequence/design-system/styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider>
      <ThemeProvider theme="dark">
        <Component {...pageProps} />
      </ThemeProvider>
    </WagmiProvider>
  );
}

export default MyApp;
