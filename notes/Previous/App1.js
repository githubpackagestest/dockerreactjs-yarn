import bluecircle from './img/bluecircle.svg';
import reddownarrow from './img/reddownarrow.svg';
import greenuparrow from './img/greenuparrow.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={bluecircle} className="App-recommend" alt="hold" />
        <img src={reddownarrow} className="App-recommend" alt="sell" />
        <img src={greenuparrow} className="App-recommend" alt="buy" />
        <p>
          Hold
        </p>
      </header>
    </div>
    <div>
      <body>
      </body>
    </div>
  );
}

export default App;
