import React from 'react';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import './styles/main.scss';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
};

export default App;
