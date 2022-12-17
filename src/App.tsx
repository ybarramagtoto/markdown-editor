import './App.css';
import EditablePage from './components/EditablePage';

function App() {
  return (
    <div className="App container h-screen mx-auto px-10 bg-gray-200">
      <h1 className='px-10'>Editor</h1>
      <EditablePage />
    </div>
  );
}

export default App;
