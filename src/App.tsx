import people from './mock-data/people';
import widgets from './mock-data/widgets';

function App() {
  return (
    <>
      <h2>Widgets</h2>
      {widgets.map((w) => (
        <h3>{w.title}</h3>
      ))}
      <h2>People</h2>
      {people.map((p) => (
        <h3>{`${p.firstName} ${p.lastName}`}</h3>
      ))}
    </>
  );
}

export default App;
