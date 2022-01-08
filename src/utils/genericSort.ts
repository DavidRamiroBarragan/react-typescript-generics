import IProperty from '../interfaces/IProperty';

export default function genericSort<T>(a: T, b: T, props: IProperty<T>) {
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
