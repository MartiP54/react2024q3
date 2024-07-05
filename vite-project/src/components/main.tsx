import './main.css';
import React from 'react'; 
import AstronomicalObjects from '../services/Stapi';

interface MainProps {
  query: string;
  searchKey: number;
}

export default class Main extends React.Component<MainProps> {
  render() {
    const { query, searchKey } = this.props;
    return (
      <main className='main'>
        <AstronomicalObjects query={query} searchKey={searchKey} />
      </main>
    )
  }
}