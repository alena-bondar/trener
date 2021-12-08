import React, { useState } from "react";
import "./style.scss";
import arrow from "images/arrow-to-right.svg";
import { PriceWindow } from "./price-window/PriceWindow";

export const FilterByPrice: React.FC = () => {
  const [showPriceWindow, setShowPriceWindow] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  return (
    <div className="by-price">
      <div className="by-price__text-container">
        <span className="by-price__filter-txt">Фільтр</span>
        <button
          onClick={() => setFilterValue("")}
          className="by-price__reset-txt"
        >
          Скинути
        </button>
      </div>
      <div className="by-price__container">
        <input
          value={filterValue}
          readOnly
          onClick={() => setShowPriceWindow(true)}
          type="text"
          className="by-sport__input hideIt"
          placeholder="Вартість"
        />

        {/* {(true && true && (*/}
        <img
          // onClick={clearParams}
          className="arrow-img"
          src={arrow}
          alt="Cross"
        />
        {/* )) || <img className="arrow-img  cross" src={arrow} alt="Arrow" />}*/}
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
