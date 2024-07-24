import { useTheme } from '../context/ThemeContext';

function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <label htmlFor="light-theme">
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
      <label htmlFor="dark-theme">
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
