import React, { useCallback, useEffect, useRef } from "react";
import classnames from "classnames";
import "./style.scss";

interface exit {
  min: number;
  max: number;
  minVal: number;
  onChange: ({ min, max }: { min: number; max: number }) => void;
  maxVal: number;
  setMinVal: React.Dispatch<React.SetStateAction<number>>;
  setMaxVal: React.Dispatch<React.SetStateAction<number>>;
}

const MultiRangeSlider = ({
  min,
  max,
  onChange,
  minVal,
  maxVal,
  setMinVal,
  setMaxVal,
}: exit): JSX.Element => {
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef<HTMLHeadingElement>(null);

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, maxVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, minVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="container">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        className={classnames("thumb thumb--zindex-3", {
          "thumb--zindex-5": minVal > max - 100,
        })}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        className="thumb thumb--zindex-4"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value" />
        <div className="slider__right-value" />
      </div>
    </div>
  );
};

export default MultiRangeSlider;
