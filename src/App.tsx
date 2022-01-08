import { useState } from 'react';
import Filters from './components/renderers/Filters';
import PersonRender from './components/renderers/PersonRender';
import WidgetRender from './components/renderers/WidgetRender';
import SearchInput from './components/SearchInput';
import Sorters from './components/Sorters';
import IFilters from './interfaces/IFilters';
import IPerson from './interfaces/IPerson';
import ISorters from './interfaces/ISorters';
import { IWidget } from './interfaces/IWidget.';
import people from './mock-data/people';
import widgets from './mock-data/widgets';
import genericFilter from './utils/genericFilter';
import genericSearch from './utils/genericSearch';
import genericSort from './utils/genericSort';

function App() {
  const [showPeople, setShowPeople] = useState<boolean>(false);
  const [searchQuery, setSetSearchQuery] = useState<string>('');
  const [sortWidgetProperty, setSortWidgetProperty] = useState<ISorters<IWidget>>({
    property: 'title',
    isDescending: true,
  });
  const [widgetFilterProperty, setWidgetFilterProperty] = useState<Array<IFilters<IWidget>>>([]);
  const [peopleFilterProperty, setPeopleFilterProperty] = useState<Array<IFilters<IPerson>>>([]);
  const [sortPersonProperty, setSortPersonProperty] = useState<ISorters<IPerson>>({
    property: 'firstName',
    isDescending: true,
  });
  const buttonText = showPeople ? 'Show widgets' : 'Show people';

  return (
    <div className="container">
      <button className="btn btn-primary" onClick={() => setShowPeople((s) => !s)}>
        {buttonText}
      </button>
      <br />
      <SearchInput
        setSearchQuery={(e) => {
          setSetSearchQuery(e);
        }}
      />
      {!showPeople && (
        <>
          <h2>Widgets</h2>
          <Sorters
            object={widgets[0]}
            setProperty={(propertyType) => {
              setSortWidgetProperty(propertyType);
            }}
          />
          <Filters
            properties={widgetFilterProperty}
            onChangeFilter={(property) => {
              const propertyMatch = widgetFilterProperty.some((wf) => wf.property === property.property);
              const fullMatch = widgetFilterProperty.some(
                (wf) => wf.property === property.property && wf.isTruthySelected === property.isTruthySelected
              );

              if (fullMatch) {
                setWidgetFilterProperty((wpf) => [...wpf.filter((w) => w.property !== property.property)]);
              } else if (propertyMatch) {
                setWidgetFilterProperty((wpf) => [...wpf.filter((w) => w.property !== property.property), property]);
              } else {
                setWidgetFilterProperty((wp) => [...wp, property]);
              }
            }}
            object={widgets[0]}
          />
          {widgets
            .filter((widget) => genericSearch(widget, ['title'], searchQuery))
            .filter((widget) => genericFilter(widget, widgetFilterProperty))
            .sort((a, b) => genericSort(a, b, sortWidgetProperty))
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
            setProperty={(propertyType) => {
              setSortPersonProperty(propertyType);
            }}
          />
          <Filters
            properties={peopleFilterProperty}
            onChangeFilter={(property) => {
              const isMatchingProperty = peopleFilterProperty.some(
                (peopleProperty) => peopleProperty.property === property.property
              );

              const isFullMatchProperty = peopleFilterProperty.some(
                (peopleProperty) =>
                  peopleProperty.property === property.property &&
                  peopleProperty.isTruthySelected === property.isTruthySelected
              );
              if (isFullMatchProperty) {
                setPeopleFilterProperty((pf) => [...pf.filter((p) => p.property !== property.property)]);
              } else if (isMatchingProperty) {
                setPeopleFilterProperty((pf) => [...pf.filter((p) => p.property !== property.property), property]);
              } else {
                setPeopleFilterProperty((p) => [...p, property]);
              }
            }}
            object={people[0]}
          />
          {people
            .filter((person) => genericSearch(person, ['firstName'], searchQuery))
            .filter((person) => genericFilter(person, peopleFilterProperty))
            .sort((a, b) => genericSort(a, b, sortPersonProperty))
            .map((p, i) => (
              <PersonRender {...p} key={`p.firstName-${i}`} />
            ))}
        </>
      )}
    </div>
  );
}

export default App;
