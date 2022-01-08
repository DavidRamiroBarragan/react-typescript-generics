import { ReactElement } from 'react';
import IFilters from '../../interfaces/IFilters';

interface Props<T> {
  object: T;
  properties: Array<IFilters<T>>;
  onChangeFilter: (property: IFilters<T>) => void;
}

export default function Filters<T>({ object, properties, onChangeFilter }: Props<T>): ReactElement {
  return (
    <div className="p-1 my-2">
      <label htmlFor="filters">Filters!! Try us 😉</label>
      {Object.keys(object).map((key, i) => (
        <>
          <input
            type="checkbox"
            name=""
            id={`${key}-true`}
            value={key}
            onChange={() => onChangeFilter({ property: key as any, isTruthySelected: true })}
            checked={properties.some((prop) => prop.property === key && prop.isTruthySelected)}
            className="m-1 ml-3"
          />
          <label key={`${key}-true-${i}`}>{key} is truthy</label>
          <br />
          <input
            type="checkbox"
            name=""
            id={`${key}-false`}
            value={key}
            onChange={() => onChangeFilter({ property: key as any, isTruthySelected: false })}
            checked={properties.some((prop) => prop.property === key && !prop.isTruthySelected)}
            className="m-1 ml-3"
          />
          <label key={`${key}-false-${i}`}>{key} is falsy</label>
        </>
      ))}
    </div>
  );
}
