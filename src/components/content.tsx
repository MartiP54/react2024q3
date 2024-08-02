
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import AstronomicalObjects from '../services/Stapi';

export default function Content() {
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const currentPage = useSelector((state: RootState) => state.pagination.currentPage);


  return (
    <main className='main'>
        <AstronomicalObjects searchQuery={searchQuery} currentPage={currentPage}/>
    </main>
  );
}
