import React, { useState } from "react";
import { SelectCity } from "./SelectCity";
import { SelectLanguage } from "./SelectLanguage";
import { TrenerRegistration } from "./trener-registration/TrenerRegistration";

import person from "images/person.svg";
import "./style.scss";
import { TrenerLogin } from "./trener-login/TrenerLogin";

export const Header: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Київ");
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("українська");
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
  const [isLoginVisible, setIsLoginVisible] = useState(true);

  const showLogIn = () => setIsLoginVisible(true);

  return (
    <div className="header-wrapper">
      <div className="chose-container">
        <div className="logo" />

        <span className="text">
          Ваше місто:&nbsp;&nbsp;
          <a href="" className="text__link text--300">
            {selectedCity}
          </a>
        </span>

        {false && <SelectCity setSelectedCity={setSelectedCity} />}

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
          <img src={person} className="person" />

          <button onClick={showLogIn} className="enter-button text text--300">
            Увійти
          </button>
          {isLoginVisible ? (
            <TrenerLogin
              isLoginVisible={isLoginVisible}
              setIsLoginVisible={setIsLoginVisible}
            />
          ) : (
            <></>
          )}
        </div>

        <button
          onClick={() => setShowRegistration(true)}
          className="registration-button text text--300"
        >
          <span className="plus-icon"> </span>
          Реєстрація тренера
        </button>
      </div>

      {showRegistration && (
        <TrenerRegistration setShowRegistration={setShowRegistration} />
      )}
    </div>
  );
};
