import { useState } from 'react';
import ISorters from '../interfaces/ISorters';
import PropsWithChildrenFunction from '../types/PropsWithChildrenFunction';
import genericSort from '../utils/genericSort';

interface ISortersProps<T> {
  dataSource: Array<T>;
  initialSortProperty: keyof T;
}

export default function Sorters<T>({
  dataSource,
  initialSortProperty,
  children,
}: PropsWithChildrenFunction<ISortersProps<T>, T>) {
  const object = dataSource.length > 0 ? dataSource[0] : {};
  const [sortProperty, setSorProperty] = useState<ISorters<T>>({
    property: initialSortProperty,
    isDescending: true,
  });
  return (
    <>
      <label className="mt-3" htmlFor="sorters">
        Sorters! Try us too
      </label>
      <select
        id="sorters"
        className="form-control full-width"
        onChange={(e) => {
          const values = e.target.value.split('-');
          if (values.length === 2) {
            setSorProperty({
              property: values[0] as any,
              isDescending: values[1] === 'true',
            });
          }
        }}
      >
        {Object.keys(object).map((key) => (
          <>
            <option key={`${key}-true`} value={`${key}-true`}>
              Sort by {key} descending
            </option>
            <option key={`${key}-false`} value={`${key}-false`}>
              Sort by {key} ascending
            </option>
          </>
        ))}
      </select>
      {children && dataSource.sort((a, b) => genericSort(a, b, sortProperty)).map((item) => children(item))}
    </>
  );
}
