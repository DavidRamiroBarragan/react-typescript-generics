import ISorters from '../interfaces/ISorters';

interface ISortersProps<T> {
  object: T;
  setProperty: (propertyType: ISorters<T>) => void;
}

export default function Sorters<T>({ object, setProperty }: ISortersProps<T>) {
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
            setProperty({
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
    </>
  );
}
