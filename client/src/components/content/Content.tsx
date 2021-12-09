import React from "react";
import "./style.scss";
import { Filters } from "./filters/Filters";
import {TrenerLogin} from "../header/trener-login/TrenerLogin";
import {TrenerLogout} from "../header/trener-logout/TrenerLogout";

export const Content: React.FC = () => {
  return (
    <div className="content">
      <div className="treners-city-text">
        <p>Тренери в місті Львів</p>
      </div>

      <div className="content__blocks">
        <div>
          <div className="parametrs">
            <Filters />

            <div className="bookmarks"></div>
          </div>
            <TrenerLogin />
            <TrenerLogout />
          <div className="showing-treners">All treners</div>
        </div>
      </div>
    </div>
  );
};
