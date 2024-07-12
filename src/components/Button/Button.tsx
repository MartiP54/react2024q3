import React from 'react';
import './Button.css';


interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ onClick }: ButtonProps) {
  return (
    <button className='button' type='button' onClick={onClick}>
      Search
    </button>
  );
}