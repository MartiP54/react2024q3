import AstronomicalObjects from '../services/Stapi';
import { AstronomicalObject } from '../services/astronomicalObjectsApi';

interface ContentProps {
  initialData: AstronomicalObject[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  selectedId?: string | null;
  detailsData?: { astronomicalObject: AstronomicalObject } | null; 
}

export default function Content({ initialData, currentPage, totalPages, searchQuery, selectedId, detailsData }: ContentProps) {
  return (
    <main className='main'>
      <AstronomicalObjects 
        initialData={initialData} 
        currentPage={currentPage} 
        totalPages={totalPages} 
        searchQuery={searchQuery} 
        selectedId={selectedId} 
        detailsData={detailsData} 
      />
    </main>
  );
}
