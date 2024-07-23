// content.tsx
import './content.css';
import { useSelector } from 'react-redux';
import AstronomicalObjects from '../services/Stapi';
import { RootState } from '../store';

export default function Content() {
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const currentPage = useSelector((state: RootState) => state.pagination.currentPage);

  return (
    <main className='main'>
      <AstronomicalObjects searchQuery={searchQuery} currentPage={currentPage} />
    </main>
  );
}
