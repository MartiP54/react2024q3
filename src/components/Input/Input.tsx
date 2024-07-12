import React from 'react'; 

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input ({ value, onChange }: InputProps) {
    return (
      <input 
        className='input' 
        type='search' 
        placeholder='Search' 
        value={value}
        onChange={onChange}
      />
    )
}