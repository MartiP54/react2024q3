import { useNavigate, useLocation } from 'react-router-dom';


interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination ({ currentPage, totalPages }: PaginationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', page.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i+=1) {
    pages.push(
      <button
        key={i}
        type="button"
        onClick={() => handlePageChange(i)}
        disabled={i === currentPage}
      >
        {i}
      </button>
    );
  }

  return <div className="pagination">{pages}</div>;
}
