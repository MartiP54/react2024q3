import './content.css';
import AstronomicalObjects from '../services/Stapi';

interface MainProps {
  searchKey: number;
  searchQuery: string;
}

export default function Main ({ searchKey, searchQuery }: MainProps) {
  return (
    <main className='main'>
      <AstronomicalObjects searchKey={searchKey} searchQuery={searchQuery} />
    </main>
  );
}
