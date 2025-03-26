import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const HomePage = (props) => {

  const queryClient = new QueryClient()

  // function callPage() {
  //   const queryClient = useQueryClient()
  //   const [page, setPage] = React.useState(0)
  let page = 2

  const { isError, data, error, isPending} = useQuery({
    queryKey: ['discover', page],
    queryFn: ()=> getMovies(page),
    keepPreviousData: true,
    staleTime: 5000,
  })
  
  // React.useEffect(() => {
  //   if (!isPreviousData && data?.hasMore) {
  //     queryClient.prefetchQuery({
  //       queryKey: ['discover', page + 1],
  //       queryFn: () => getMovies(page + 1),
  //     })
  //   }
  // }, [data2, isPreviousData, page, queryClient])

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
);
};

export default HomePage;
