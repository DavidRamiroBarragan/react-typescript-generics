import { useState } from 'react';
import IFilters from '../../interfaces/IFilters';
import PropsWithChildrenFunction from '../../types/PropsWithChildrenFunction';
import genericFilter from '../../utils/genericFilter';

interface Props<T> {
  dataSource: Array<T>;
}

export default function Filters<T>({ dataSource, children }: PropsWithChildrenFunction<Props<T>, T>) {
  const [filterProperties, setFilterProperties] = useState<Array<IFilters<T>>>([]);

  const object = dataSource.length > 0 ? dataSource[0] : [];

  function handleOnchangeFilter(property: IFilters<T>) {
    const isMatchingProperty = filterProperties.some((peopleProperty) => peopleProperty.property === property.property);

    const isFullMatchProperty = filterProperties.some(
      (peopleProperty) =>
        peopleProperty.property === property.property && peopleProperty.isTruthySelected === property.isTruthySelected
    );
    if (isFullMatchProperty) {
      setFilterProperties((pf) => [...pf.filter((p) => p.property !== property.property)]);
    } else if (isMatchingProperty) {
      setFilterProperties((pf) => [...pf.filter((p) => p.property !== property.property), property]);
    } else {
      setFilterProperties((p) => [...p, property]);
    }
  }

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
            onChange={() => handleOnchangeFilter({ property: key as any, isTruthySelected: true })}
            checked={filterProperties.some((prop) => prop.property === key && prop.isTruthySelected)}
            className="m-1 ml-3"
          />
          <label key={`${key}-true-${i}`}>{key} is truthy</label>
          <br />
          <input
            type="checkbox"
            name=""
            id={`${key}-false`}
            value={key}
            onChange={() => handleOnchangeFilter({ property: key as any, isTruthySelected: false })}
            checked={filterProperties.some((prop) => prop.property === key && !prop.isTruthySelected)}
            className="m-1 ml-3"
          />
          <label key={`${key}-false-${i}`}>{key} is falsy</label>

          {children && dataSource
            ? dataSource.filter((person) => genericFilter(person, filterProperties)).map((item) => children(item))
            : []}
        </>
      ))}
    </div>
  );
}
