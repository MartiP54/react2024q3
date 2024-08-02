import './index.css'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ThemeProvider } from '../context/ThemeContext'
import { store } from '../store'

function MyApp({ Component }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component/>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp