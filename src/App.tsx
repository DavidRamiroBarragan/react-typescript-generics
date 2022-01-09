import { useState } from 'react';
import PersonRender from './components/renderers/PersonRender';
import WidgetRender from './components/renderers/WidgetRender';
import SearchSortAndFilter from './components/SearchSortAndFilter';
import people from './mock-data/people';
import widgets from './mock-data/widgets';

function App() {
  const [showPeople, setShowPeople] = useState<boolean>(false);
  const buttonText = showPeople ? 'Show widgets' : 'Show people';

  return (
    <div className="container">
      <button className="btn btn-primary" onClick={() => setShowPeople((s) => !s)}>
        {buttonText}
      </button>
      <br />
      {!showPeople && (
        <SearchSortAndFilter
          dataSource={widgets}
          initialFilterProperties={[]}
          initialSearchQuery=""
          initialSortProperty={{ property: 'title', isDescending: true }}
          searchProperties={['title', 'description']}
          title="Widgets"
        >
          {(widget) => <WidgetRender {...widget} key={widget.id} />}
        </SearchSortAndFilter>
      )}
      {showPeople && (
        <SearchSortAndFilter
          dataSource={people}
          initialFilterProperties={[]}
          initialSearchQuery=""
          initialSortProperty={{ property: 'firstName', isDescending: true }}
          searchProperties={['firstName', 'lastName']}
          title="People"
        >
          {(person) => <PersonRender {...person} key={person.id} />}
        </SearchSortAndFilter>
      )}
    </div>
  );
}

export default App;
