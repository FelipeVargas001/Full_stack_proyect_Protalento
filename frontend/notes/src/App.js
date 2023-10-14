import './App.css';
import Index from './pages/Index';


function App() {
  const API_URL = process.env.REACT_APP_API_URL;
  return (
    <div className="container">
      <Index/>
    </div>
  );
}

export default App;
