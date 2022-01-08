export default interface IFilters<T> {
  property: keyof T;
  isTruthySelected: boolean;
}
