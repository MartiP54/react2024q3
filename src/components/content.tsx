import './content.css';
import AstronomicalObjects from '../services/Stapi';

interface MainProps {
  searchKey: number;
}

export default function Main ({ searchKey }:MainProps) {
    return (
      <main className='main'>
        <AstronomicalObjects searchKey={searchKey} />
      </main>
    )
  }