import { useTheme } from '../context/ThemeContext';

function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <label htmlFor="light-theme" className="label-light">
        <input
          type="radio"
          id="light-theme"
          name="theme"
          value="light"
          checked={theme === 'light'}
          onChange={() => setTheme('light')}
        />
        Light
      </label>
      <label htmlFor="dark-theme" className="label-dark">
        <input
          type="radio"
          id="dark-theme"
          name="theme"
          value="dark"
          checked={theme === 'dark'}
          onChange={() => setTheme('dark')}
        />
        Dark
      </label>
    </div>
  );
}

export default ThemeSelector;
