import { useState } from 'react';
import Filters from './components/renderers/Filters';
import PersonRender from './components/renderers/PersonRender';
import WidgetRender from './components/renderers/WidgetRender';
import SearchInput from './components/SearchInput';
import Sorters from './components/Sorters';
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
        <>
          <h2>Widgets</h2>
          <SearchInput dataSource={widgets} searchKeys={[]}>
            {(widget) => <WidgetRender {...widget} />}
          </SearchInput>
          <Sorters dataSource={widgets} initialSortProperty={'title'}>
            {(widget) => <WidgetRender {...widget} />}
          </Sorters>
          <Filters dataSource={widgets}>{(widget) => <WidgetRender {...widget} />}</Filters>
        </>
      )}
      {showPeople && (
        <>
          <h2>People</h2>
          <SearchInput dataSource={people} searchKeys={[]}>
            {(person) => <PersonRender {...person} />}
          </SearchInput>
          <Sorters dataSource={people} initialSortProperty={'firstName'}>
            {(person) => <PersonRender {...person} />}
          </Sorters>
          <Filters dataSource={people}>{(person) => <PersonRender {...person} />}</Filters>
        </>
      )}
    </div>
  );
}

export default App;
