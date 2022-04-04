import 'styles/global.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    //<SessionProvider session={pageProps.session}>
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
    //</SessionProvider>
  )
}

export default App

