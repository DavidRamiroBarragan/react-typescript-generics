import React, { useState } from 'react';
import IFilters from '../interfaces/IFilters';
import ISorters from '../interfaces/ISorters';
import PropsWithChildrenFunction from '../types/PropsWithChildrenFunction';
import genericFilter from '../utils/genericFilter';
import genericSearch from '../utils/genericSearch';
import genericSort from '../utils/genericSort';
import Filters from './renderers/Filters';
import SearchInput from './SearchInput';
import Sorters from './Sorters';

interface SearchSortAndFilterProps<T> {
  dataSource: T[];
  initialFilterProperties: Array<IFilters<T>>;
  initialSearchQuery: string;
  initialSortProperty: ISorters<T>;
  searchProperties: Array<keyof T>;
  title: string;
}

export interface ISearchSortAndFilter<T> {
  filterProperties: Array<IFilters<T>>;
  searchQuery: string;
  sortProperty: ISorters<T>;
}

export default function SearchSortAndFilter<T>({
  children,
  dataSource,
  initialFilterProperties,
  initialSearchQuery,
  initialSortProperty,
  searchProperties,
  title,
}: PropsWithChildrenFunction<SearchSortAndFilterProps<T>, T>) {
  const [searchAndSortState, setSearchAndSortState] = useState<ISearchSortAndFilter<T>>({
    searchQuery: initialSearchQuery,
    sortProperty: initialSortProperty,
    filterProperties: initialFilterProperties,
  });

  const { searchQuery, sortProperty, filterProperties } = searchAndSortState;

  return (
    <div>
      <>
        <h2>{title}</h2>
        <SearchInput
          setSetSearchQuery={(searchQuery) =>
            setSearchAndSortState((state) => ({
              ...state,
              searchQuery,
            }))
          }
        />
        <Sorters
          dataSource={dataSource}
          setSorProperty={(sortProperty) => setSearchAndSortState((state) => ({ ...state, sortProperty }))}
        />
        <Filters
          dataSource={dataSource}
          filterProperties={filterProperties}
          setFilterProperties={(filterProperties) => setSearchAndSortState((state) => ({ ...state, filterProperties }))}
        />
        {dataSource
          .sort((a, b) => genericSort(a, b, sortProperty))
          .filter((widget) => genericSearch(widget, searchProperties, searchQuery))
          .filter((person) => genericFilter(person, filterProperties))
          .map((item) => (children && dataSource.length > 0 ? children(item) : []))}
      </>
    </div>
  );
}
