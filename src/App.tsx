import { useState } from 'react';
import PersonRender from './components/renderers/PersonRender';
import WidgetRender from './components/renderers/WidgetRender';
import SearchInput from './components/SearchInput';
import Sorters from './components/Sorters';
import IPerson from './interfaces/IPerson';
import IProperty from './interfaces/IProperty';
import { IWidget } from './interfaces/IWidget.';
import people from './mock-data/people';
import widgets from './mock-data/widgets';
import genericSearch from './utils/genericSearch';
import genericSort from './utils/genericSort';

function App() {
  const [showPeople, setShowPeople] = useState<boolean>(false);
  const [searchQuery, setSetSearchQuery] = useState<string>('');
  const [sortWidgetProperty, setSortWidgetProperty] = useState<
    IProperty<IWidget>
  >({
    property: 'title',
  });
  const [sortPersonProperty, setSortPersonProperty] = useState<
    IProperty<IPerson>
  >({
    property: 'firstName',
  });
  const buttonText = showPeople ? 'Show widgets' : 'Show people';

  return (
    <div className="container">
      <button
        className="btn btn-primary"
        onClick={() => setShowPeople((s) => !s)}
      >
        {buttonText}
      </button>
      <br />
      <SearchInput
        setSearchQuery={(e) => {
          console.log('fire');
          setSetSearchQuery(e);
        }}
      />
      {!showPeople && (
        <>
          <h2>Widgets</h2>
          <Sorters
            object={widgets[0]}
            setProperty={(property) => {
              setSortWidgetProperty({ property });
            }}
          />
          {widgets
            .filter((widget) => genericSearch(widget, ['title'], searchQuery))
            .sort((a, b) => genericSort(a, b, sortWidgetProperty.property))
            .map((w, i) => (
              <WidgetRender {...w} key={w.id} />
            ))}
        </>
      )}
      {showPeople && (
        <>
          <h2>People</h2>
          <Sorters
            object={people[0]}
            setProperty={(property) => {
              setSortPersonProperty({ property });
            }}
          />
          {people
            .filter((person) =>
              genericSearch(person, ['firstName'], searchQuery)
            )
            .sort((a, b) => genericSort(a, b, sortPersonProperty.property))
            .map((p, i) => (
              <PersonRender {...p} key={`p.firstName-${i}`} />
            ))}
        </>
      )}
    </div>
  );
}

export default App;
