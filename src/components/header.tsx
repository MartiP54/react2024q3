import './header.css';
import React from 'react'; 
import Input from './Input/Input';
import Button from './Button/Button';

interface HeaderProps {
  onSearch: (query: string) => void;
  initialQuery: string;
  onError: (error: Error) => void;
}

interface HeaderState {
  query: string;
}

export default class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      query: props.initialQuery || '',
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

  handleThrowError = () => {
    const { onError } = this.props;
    try {
      throw new Error("Test error");
    } catch (error) {
      onError(error as Error);
    }
  }

  render() {
    const { query } = this.state;
    return (
      <header className='header'>
        <Input value={query} onChange={this.handleInputChange} />
        <Button onClick={this.handleSearch} />
        <button type="button" className="button" onClick={this.handleThrowError}>Throw Error</button>
      </header>
    );
  }
}