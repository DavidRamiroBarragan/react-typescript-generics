import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';

interface ISearchInputProps {
  setSearchQuery: (searchQuery: string) => void;
}
function SearchInput({ setSearchQuery }: ISearchInputProps) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 250);

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  return (
    <>
      <label htmlFor="search" className="mt-3">
        Search! Try me!
      </label>
      <input
        type="text"
        name="search"
        id="search"
        className="form-control full-width"
        placeholder="Search"
        aria-label="Search"
        onChange={(event) => setQuery(event.target.value)}
      />
    </>
  );
}

export default SearchInput;
