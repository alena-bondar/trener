import React, { useState } from 'react';
import { SelectCity } from '../helpers/SelectCity';
import { SelectLanguage } from '../helpers/SelectLanguage';
import './style.scss';

export const Header: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Київ');
  const [selectedLanguage, setSelectedLanguage] = useState('українська');

  return (
    <div className="header-wrapper">
      <div className="chose-container">
        <div className="logo"></div>
        <span className="text">
          Ваше місто:&nbsp;&nbsp;
          <a href="" className="text__link text--300">
            {selectedCity}
          </a>
        </span>

        {false && <SelectCity setChoicedCity={setSelectedCity} />}

        <span className="text text__language">
          Мова:&nbsp;&nbsp;
          <a href="" className="text__link  text--300">
            {selectedLanguage}
          </a>
        </span>

        {false && <SelectLanguage setSelectedLanguage={setSelectedLanguage} />}
      </div>

      <div className="enter-container">
        <div>
          <img src="https://svgsilh.com/svg/1824147-828282.svg" className="person" />

          <button className="enter-button text text--300">Увійти</button>
        </div>

        <button className="registration-button text text--300">
          <span className="plus-icon"> </span>
          Реєстрація тренера
        </button>
      </div>
    </div>
  );
};
