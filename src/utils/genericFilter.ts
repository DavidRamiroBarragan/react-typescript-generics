import IFilters from '../interfaces/IFilters';

export default function genericFilter<T>(object: T, filterProperties: Array<IFilters<T>>): boolean {
  return filterProperties.every((filterProperty) => {
    const { property, isTruthySelected } = filterProperty;
    return isTruthySelected ? object[property] : !object[property];
  });
}
