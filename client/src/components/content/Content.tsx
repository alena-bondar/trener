import React from "react";
import "./style.scss";
import { Filters } from "./filters/Filters";

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

          <div className="showing-treners">All treners</div>
        </div>
      </div>
    </div>
  );
};
