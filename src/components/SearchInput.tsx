import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import PropsWithChildrenFunction from '../types/PropsWithChildrenFunction';
import genericSearch from '../utils/genericSearch';

interface ISearchInputProps<T> {
  setSetSearchQuery(searchQuery: string): void;
}
function SearchInput<T>({ setSetSearchQuery }: ISearchInputProps<T>) {
  const [query, setQuery] = useState<string>('');
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
        className="form-control full-width"
        placeholder="Search"
        aria-label="Search"
        onChange={(event) => setSetSearchQuery(event.target.value)}
      />
    </>
  );
}

export default SearchInput;
