import { useState } from 'react';
import SearchInput from './components/SearchInput';
import people from './mock-data/people';
import widgets from './mock-data/widgets';
import genericSearch from './utils/genericSearch';

function App() {
  const [searchQuery, setSetSearchQuery] = useState<string>('');

  return (
    <>
      <SearchInput
        setSearchQuery={(e) => {
          console.log('fire');
          setSetSearchQuery(e);
        }}
      />
      <h2>Widgets</h2>
      {widgets
        .filter((widget) => genericSearch(widget, ['title'], searchQuery))
        .map((w, i) => (
          <h3 key={`${w.title}-${i}`}>{w.title}</h3>
        ))}
      <h2>People</h2>
      {people
        .filter((person) => genericSearch(person, ['firstName'], searchQuery))
        .map((p, i) => (
          <h3 key={`${p.firstName}-${i}`}>{`${p.firstName} ${p.lastName}`}</h3>
        ))}
    </>
  );
}

export default App;
