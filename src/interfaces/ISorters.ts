export default interface ISorters<T> {
  property: Extract<keyof T, string | Date | number>;
  isDescending: boolean;
}
