import { Fragment } from 'react';
import ISorters from '../interfaces/ISorters';

interface ISortersProps<T> {
  dataSource: Array<T>;
  setSorProperty(sortProperty: ISorters<T>): void;
}

export default function Sorters<T>({ dataSource, setSorProperty }: ISortersProps<T>) {
  const object = dataSource.length > 0 ? dataSource[0] : {};
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
        {Object.keys(object).map((key, i) => (
          <Fragment key={i}>
            <option key={`${key}-true`} value={`${key}-true`}>
              Sort by {key} descending
            </option>
            <option key={`${key}-false`} value={`${key}-false`}>
              Sort by {key} ascending
            </option>
          </Fragment>
        ))}
      </select>
    </>
  );
}
