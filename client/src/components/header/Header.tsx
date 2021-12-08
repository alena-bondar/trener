import React, { useState } from "react";
import { SelectCity } from "./SelectCity";
import { SelectLanguage } from "./SelectLanguage";
import { TrenerRegistration } from "./trener-registration/TrenerRegistration";

import person from "images/person.svg";
import "./style.scss";
import firebase from "firebase/compat";
import {auth} from "../../firebase-config";

export const Header: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Київ");
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("українська");
  const [showRegistration, setShowRegistration] = useState<boolean>(false);

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const user = await auth.signInWithPopup(provider);
    console.log(user.additionalUserInfo?.profile)

  }

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

          <button onClick={login} className="enter-button text text--300">Увійти</button>
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
