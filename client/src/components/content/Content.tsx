import React from "react";
import "./style.scss";
import { Filters } from "./filters/Filters";
import TrenerList from "./trener-list/TrenerList";
import { useLocation } from "react-router-dom";

const Content = (): JSX.Element => {
  const query = new URLSearchParams(useLocation().search);
  const queryParams = {
    sport: query.get("sport") || "",
    priceFrom: query.get("priceFrom") || "",
    priceTo: query.get("priceTo") || "",
  };

  return (
    <div className="content">
      <div className="treners-city-text">
        <p>Тренери в місті Львів</p>
      </div>

      <div className="content__blocks">
        <div className="parametrs">
          <Filters />

          <div className="bookmarks" />
        </div>

        <div className="showing-treners">
          <div className="rating-block"></div>
          <TrenerList queryParams={queryParams} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Content);
