import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ThemeSelector from './components/ThemeSelector';
import { ThemeProvider } from './context/ThemeContext';


export default function App () {
  

    return (
      <ThemeProvider>
        <ThemeSelector />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
              </Routes>
        </ThemeProvider>
    );

}