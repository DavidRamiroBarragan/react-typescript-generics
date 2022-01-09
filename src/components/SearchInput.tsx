import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';

interface ISearchInputProps<T> {
  setSetSearchQuery(searchQuery: string): void;
  searchQuery: string;
}
function SearchInput<T>({ setSetSearchQuery, searchQuery }: ISearchInputProps<T>) {
  const [query, setQuery] = useState<string>(searchQuery);
  const debouncedQuery = useDebounce(query, 250);

  useEffect(() => {
    setSetSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSetSearchQuery]);

  return (
    <>
      <label htmlFor="search" className="mt-3">
        Search! Try me!
      </label>
      <input
        type="text"
        name="search"
        id="search"
        value={query}
        className="form-control full-width"
        placeholder="Search"
        aria-label="Search"
        onChange={(event) => setQuery(event.target.value)}
      />
    </>
  );
}

export default SearchInput;
