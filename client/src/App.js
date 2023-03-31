import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';


function App() {
  return (
    <div className="App">
      <div className="className='flex justify-center mt-10 items-center"> </div>
      <header className="App-header">
        <Header/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Footer />
    </div>
  );
} 



export default App;
