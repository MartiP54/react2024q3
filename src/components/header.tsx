import React, { useState, useEffect } from 'react';
import Input from './Input/Input';
import Button from './Button/Button';

interface HeaderProps {
  initialQuery: string;
  onSearch: (newQuery: string) => void;
}

export default function Header({ initialQuery,onSearch }: HeaderProps) {
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

  return (
    <header className='header'>
      <Input value={query} onChange={handleInputChange} />
      <Button onClick={handleSearch}>Search</Button>
    </header>
  );
}
