import './index.css'
import './App.css'
import { AppProps } from 'next/app'
import { ThemeProvider } from '../context/ThemeContext'
import ThemeSelector from '../components/ThemeSelector';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ThemeSelector />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
