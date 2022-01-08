import ISorters from '../interfaces/ISorters';

export default function genericSort<T>(a: T, b: T, props: ISorters<T>) {
  const { property, isDescending } = props;
  const result = () => {
    if (a[property] > b[property]) {
      return 1;
    }
    if (a[property] < b[property]) {
      return -1;
    }
    return 0;
  };

  return isDescending ? result() * -1 : result();
}
