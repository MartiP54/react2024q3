import './App.css';
import React from 'react'; 
import Header from './components/header';
import Main from './components/main';
import ErrorBoundary from './components/errorBoundary';


interface AppState {
  query: string;
  searchKey: number;
}

export default class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      query: localStorage.getItem('lastSearchMarti') || '',
      searchKey: 0,
    };
  }

  handleSearch = (query: string) => {
    this.setState((prevState) => ({
      query,
      searchKey: prevState.searchKey + 1,
    }));
    localStorage.setItem('lastSearchMarti', query);
  };

  render() {
    const { query, searchKey } = this.state;
    return (
      <div className="app_wrar">
        <ErrorBoundary fallback={<div>Sorry for the inconvenience. An error occurred, try loading the page again.</div>}>
          {(setError) => (
            <>
              <Header onSearch={this.handleSearch} initialQuery={query} onError={setError} />
              <Main query={query} searchKey={searchKey} />
            </>
          )}
        </ErrorBoundary>
        </div>
    );
  }
}