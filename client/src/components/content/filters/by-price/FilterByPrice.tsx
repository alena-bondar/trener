import React, { useState } from "react";
import "./style.scss";
import arrow from "images/arrow-to-right.svg";
import cross from "images/cross.svg";
import { PriceWindow } from "./price-window/PriceWindow";
import { useLocation, useNavigate } from "react-router-dom";

const FilterByPrice: React.FC = () => {
  const [showPriceWindow, setShowPriceWindow] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const clearParams = () => {
    setFilterValue("");

    navigate({
      search: `?${sport}`,
    });
  };

  const reset = () => {
    setFilterValue("");
    navigate({
      search: `?${sport}`,
    });
  };

  const showWindow = () => setShowPriceWindow(true);

  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();
  const sport = query.get("sport") ? `&sport=${query.get("sport")}` : "";

  return (
    <div className="by-price">
      <div className="by-price__text-container">
        <span className="by-price__filter-txt">Фільтр</span>
        <button type="button" onClick={reset} className="by-price__reset-txt">
          Скинути
        </button>
      </div>
      <div className="by-price__container">
        <input
          value={filterValue}
          readOnly
          onClick={showWindow}
          type="text"
          className="by-sport__input hideIt"
          placeholder="Вартість"
        />

        {(filterValue.length > 0 && (
          <img
            onClick={clearParams}
            className="arrow-img cross"
            src={cross}
            alt="Cross"
          />
        )) || <img className="arrow-img" src={arrow} alt="Arrow" />}
      </div>
      {showPriceWindow && (
        <div>
          <PriceWindow
            setShowPriceWindow={setShowPriceWindow}
            setFilterValue={setFilterValue}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(FilterByPrice);
