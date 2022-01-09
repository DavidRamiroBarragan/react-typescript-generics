import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import PropsWithChildrenFunction from '../types/PropsWithChildrenFunction';
import genericSearch from '../utils/genericSearch';

interface ISearchInputProps<T> {
  dataSource: Array<T>;
  searchKeys: Array<keyof T>;
}
function SearchInput<T>({ dataSource, searchKeys, children }: PropsWithChildrenFunction<ISearchInputProps<T>, T>) {
  const [searchQuery, setSetSearchQuery] = useState<string>('');
  const debouncedQuery = useDebounce(searchQuery, 250);

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
      {children && dataSource
        ? dataSource.filter((widget) => genericSearch(widget, searchKeys, searchQuery)).map((item) => children(item))
        : []}
    </>
  );
}

export default SearchInput;
