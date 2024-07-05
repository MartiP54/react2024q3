import './main.css';
import React from 'react'; 
import AstronomicalObjects from '../services/Stapi';

interface MainProps {
  query: string;
}

export default class Main extends React.Component<MainProps> {
  render() {
    const { query } = this.props;
    return (
      <main className='main'>
        <AstronomicalObjects query={query} />
      </main>
    )
  }
}