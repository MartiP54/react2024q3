import React, { useState, useEffect } from 'react';
import Input from './Input/Input';
import Button from './Button/Button';

interface HeaderProps {
  onSearch: (query: string) => void;
  initialQuery: string;
  onError: (error: Error) => void;
}

export default function Header({ onSearch, initialQuery, onError }: HeaderProps) {
  const [query, setQuery] = useState(initialQuery || '');

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleThrowError = () => {
    try {
      throw new Error("Test error");
    } catch (error) {
      onError(error as Error);
    }
  };

  return (
    <header className='header'>
      <Input value={query} onChange={handleInputChange} />
      <Button onClick={handleSearch}>Search</Button>
      <Button onClick={handleThrowError}>Throw Error</Button>
    </header>
  );
}
