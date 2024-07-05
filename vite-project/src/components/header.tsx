import React from 'react'; 
import Input from './Input/Input';
import Button from './Button/Button';

interface HeaderProps {
  onSearch: (query: string) => void;
}

interface HeaderState {
  query: string;
}

export default class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = () => {
    const { onSearch } = this.props;
    const { query } = this.state;
    onSearch(query);
  };

  render() {
    const { query } = this.state;
    return (
      <header className='header'>
        <Input value={query} onChange={this.handleInputChange} />
        <Button onClick={this.handleSearch} />
      </header>
    )
  }
}