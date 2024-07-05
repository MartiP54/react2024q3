import './App.css';
import React from 'react'; 
import Header from './components/header';
import Main from './components/main';

interface AppState {
  query: string;
}
export default class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleSearch = (query: string) => {
    this.setState({ query });
  };

  render() {
    const { query } = this.state;
    return (
      <>
        <Header onSearch={this.handleSearch} />
        <Main query={query} />
      </>
    )
  }
}