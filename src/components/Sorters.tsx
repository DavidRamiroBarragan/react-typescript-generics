import React from 'react';

interface ISortersProps<T> {
  object: T;
  setProperty: (key: keyof T) => void;
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
        onChange={(e) => setProperty(e.target.value as any)}
      >
        {Object.keys(object).map((key) => (
          <option key={key} value={key}>
            Sort by {key}
          </option>
        ))}
      </select>
    </>
  );
}
