import React from 'react';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import './styles/main.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="content"></div>
      <Footer />
    </div>
  );
};

export default App;
