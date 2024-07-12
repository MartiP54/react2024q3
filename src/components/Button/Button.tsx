import React from 'react';
import './Button.css';


interface ButtonProps {
  onClick: () => void;
}

export default class Button extends React.Component<ButtonProps> {
  render() {
    const { onClick } = this.props;
    return (
      <button className='button' type='button' onClick={onClick}>
        Search
      </button>
    )
  }
}