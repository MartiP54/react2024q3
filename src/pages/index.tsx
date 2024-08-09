import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Header from '../components/header';
import Content from '../components/content';
import { AstronomicalObject, AstronomicalObjectResponse } from '../services/astronomicalObjectsApi';


interface HomeProps {
  initialData: AstronomicalObject[];
  query: string;
  page: number;
  totalPages: number;
  selectedId?: string | null;
  detailsData?: { astronomicalObject: AstronomicalObject } | null; 
}

interface QueryParams extends ParsedUrlQuery {
  searchQuery?: string;
  page?: string;
  id?: string;
}

export default function Home({ initialData, query, page, totalPages, selectedId, detailsData }: HomeProps) {
  const router = useRouter();

  const handleSearch = async (newQuery: string) => {
    const newQueryString = `?searchQuery=${newQuery}&page=1`;
    try {
      await router.push(newQueryString);
    } catch (error) {
      console.error("Failed to navigate:", error);
    }
  };
  
  const handleSearchWrapper = (newQuery: string) => {
    handleSearch(newQuery).catch(error => {
      console.error("Error in handleSearchWrapper:", error);
    });
  };

  return (
        <div>
          <Header onSearch={handleSearchWrapper} initialQuery={query} />
          <Content 
            initialData={initialData} 
            currentPage={page} 
            totalPages={totalPages} 
            searchQuery={query} 
            selectedId={selectedId} 
            detailsData={detailsData} 
          />
        </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext<QueryParams>) {
  try {
    const searchQuery = (context.query.searchQuery as string) || '';
    const page = Array.isArray(context.query.page)
  ? parseInt(context.query.page[0], 10)
  : parseInt(context.query.page || '1', 10);
    const selectedId = context.query.id as string || null;

    const response = await fetch(`http://stapi.co/api/v2/rest/astronomicalObject/search?pageNumber=${page - 1}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `name=${searchQuery}`,
    });

    const data = await response.json() as AstronomicalObjectResponse;

    if (!response.ok) {
      return { props: { initialData: [], query: searchQuery, page, totalPages: 0 } };
    }

    let detailsData: AstronomicalObjectResponse | null = null;

    if (selectedId) {
      const detailsResponse = await fetch(`http://stapi.co/api/v2/rest/astronomicalObject?uid=${selectedId}`);
      detailsData = await detailsResponse.json() as AstronomicalObjectResponse | null;
    }

    return { 
      props: { 
        initialData: data.astronomicalObjects, 
        query: searchQuery, 
        page, 
        totalPages: data.page.totalPages,
        selectedId,
        detailsData,
      } 
    };
  } catch (error) {
    return { props: { initialData: [], query: '', page: 1, totalPages: 0 } };
  }
}
