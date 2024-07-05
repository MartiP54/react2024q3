import './App.css';
import React from 'react'; 
import Header from './components/header';
import Main from './components/main';

interface AppState {
  query: string;
  searchKey: number;
}

export default class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    const savedQuery = localStorage.getItem('lastSearchQuery') || '';
    this.state = {
      query: savedQuery,
      searchKey: 0,
    };
  }

  handleSearch = (query: string) => {
    this.setState((prevState) => ({
      query,
      searchKey: prevState.searchKey + 1,
    }));
  };

  render() {
    const { query, searchKey } = this.state;
    return (
      <>
        <Header onSearch={this.handleSearch} initialQuery={query} />
        <Main query={query} searchKey={searchKey} />
      </>
    );
  }
}