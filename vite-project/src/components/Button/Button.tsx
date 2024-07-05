import React from 'react'; 

interface ButtonProps {
  onClick: () => void;
}

export default class Button extends React.Component<ButtonProps> {
  render() {
    const { onClick } = this.props;
    return (
      <button className='input' type='button' onClick={onClick}>
        Search
      </button>
    )
  }
}
