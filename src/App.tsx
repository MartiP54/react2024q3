import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ThemeSelector from './components/ThemeSelector';
import { ThemeProvider } from './context/ThemeContext';
import AstronomicalObjectDetails from './components/AstronomicalObjectDetails';

export default function App() {
  return (
    <ThemeProvider>
      <ThemeSelector />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="details/:id" element={<AstronomicalObjectDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}
