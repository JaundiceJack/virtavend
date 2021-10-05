import Nav from './components/nav';
import Routes from './components/routes';
import Footer from './components/footer';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="grid grid-cols-10 h-screen">
        <div className="col-span-1 sm:block hidden bg-gradient-to-l from-gray-800 to-gray-900" />
        <div className="col-span-10 sm:col-span-8 flex-grow flex flex-col bg-gray-300">
          <Nav />
          <Routes />
          <Footer />
        </div>
        <div className="col-span-1 sm:block hidden bg-gradient-to-r from-gray-800 to-gray-900" />
      </div>
    </BrowserRouter>
  );
}

export default App;
