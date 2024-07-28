import React from 'react';


interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button className='button' type='button' onClick={onClick}>
      {children}
    </button>
  );
}