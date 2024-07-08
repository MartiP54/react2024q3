import React from 'react'; 

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default class Input extends React.Component<InputProps> {
  render() {
    const { value, onChange } = this.props;
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
}