import React, { useState, useRef, useEffect } from "react";
import MyltiRangerSlider from "helpers/multiRangeSlider/MyltiRangerSlider";
import "./style.scss";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

type Props = {
  setShowPriceWindow: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
};

export const PriceWindow: React.FC<Props> = ({
  setShowPriceWindow,
  setFilterValue,
}) => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(1000);
  const rootEl = useRef(null);

  useEffect(() => {
    const onClick = () => {
      // return rootEl.current.contains(e.target) || setShowPriceWindow(false);
    };
    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  }, []);

  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();
  const price: any = {
    priceFrom: minVal,
    priceTo: maxVal,
  };
  const sport = query.get("sport") ? `&sport=${query.get("sport")}` : "";

  const setValue = () => {
    setShowPriceWindow(false);
    setFilterValue(`₴${minVal} - ${maxVal}`);

    navigate({
      pathname: "/trainers/filter",
      search: `?${createSearchParams(price)}${sport}`,
    });
  };

  const resetValues = () => {
    setMinVal(0);
    setMaxVal(1000);
  };

  return (
    <div ref={rootEl} className="price-window">
      <div className="price-window__price-range">
        <span className="price-window__price">
          ₴{minVal} - {maxVal}
        </span>
        <div className="price-window__range-container">
          <MyltiRangerSlider
            min={0}
            max={1000}
            onChange={({ min, max }: { min: number; max: number }) => {
              setMinVal(min), setMaxVal(max);
            }}
            minVal={minVal}
            maxVal={maxVal}
            setMinVal={setMinVal}
            setMaxVal={setMaxVal}
          />
        </div>
      </div>

      <div className="price-window__terminal">
        <button
          type="button"
          onClick={resetValues}
          className="price-window__reset"
        >
          Скинути
        </button>

        <button type="button" onClick={setValue} className="price-window__set">
          Обрати
        </button>
      </div>
    </div>
  );
};
