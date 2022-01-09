import { Fragment } from 'react';
import IFilters from '../../interfaces/IFilters';

interface Props<T> {
  dataSource: Array<T>;
  filterProperties: Array<IFilters<T>>;
  setFilterProperties(filterProperties: Array<IFilters<T>>): void;
}

export default function Filters<T>({ dataSource, filterProperties, setFilterProperties }: Props<T>) {
  const object = dataSource.length > 0 ? dataSource[0] : [];

  function handleOnchangeFilter(property: IFilters<T>) {
    const isMatchingProperty = filterProperties.some((peopleProperty) => peopleProperty.property === property.property);

    const isFullMatchProperty = filterProperties.some(
      (peopleProperty) =>
        peopleProperty.property === property.property && peopleProperty.isTruthySelected === property.isTruthySelected
    );
    if (isFullMatchProperty) {
      setFilterProperties([...filterProperties.filter((p) => p.property !== property.property)]);
    } else if (isMatchingProperty) {
      setFilterProperties([...filterProperties.filter((p) => p.property !== property.property), property]);
    } else {
      setFilterProperties([...filterProperties, property]);
    }
  }

  return (
    <div className="p-1 my-2">
      <label htmlFor="filters">Filters!! Try us 😉</label>
      {Object.keys(object).map((key, i) => (
        <Fragment key={i}>
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
        </Fragment>
      ))}
    </div>
  );
}
