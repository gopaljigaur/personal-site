import 'styles/global.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App

