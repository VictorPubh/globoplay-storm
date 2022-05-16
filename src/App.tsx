import { Menu } from './components/Menu';
import { Search } from './components/Search';
import { Rails } from './components/Rails';
import './App.css';
import { KeyPressListener } from './components/KeyPressListener';

function App() {
  return (
    <div className="AppGrid">
      <KeyPressListener />
      <Menu />
      <Search />
      <Rails />
    </div>
  );
}

export default App;
