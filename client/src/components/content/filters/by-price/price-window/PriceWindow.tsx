import React, { useState, useRef, useEffect } from "react";
import MyltiRangerSlider from "helpers/multiRangeSlider/MyltiRangerSlider";
import { treners } from "api/treners";
import "./style.scss";

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

  const rootEl = useRef<any>(null);

  useEffect(() => {
    const onClick = (e: any) => {
      // return rootEl.current.contains(e.target) || setShowPriceWindow(false);
    };
    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  }, []);

  const resetValues = () => {
    setMinVal(0);
    setMaxVal(1000);
  };

  const setValue = () => {
    setShowPriceWindow(false);
    setFilterValue(`₴${minVal} - ${maxVal}`);
    treners("", `priceFrom=${minVal}&priceTo=${maxVal}`);
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
        <button onClick={resetValues} className="price-window__reset">
          Скинути
        </button>
        <button onClick={setValue} className="price-window__set">
          Обрати
        </button>
      </div>
    </div>
  );
};
