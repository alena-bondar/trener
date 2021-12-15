import React, { useCallback, useEffect, useState } from "react";

import { debounce } from "helpers/debounce";
import { sports } from "api/sports";
import {
  createSearchParams,
  URLSearchParamsInit,
  useLocation,
  useNavigate,
} from "react-router-dom";
import arrow from "images/arrow-to-right.svg";
import cross from "images/cross.svg";

import KindsOfSports from "types/kindsOfSports";
import SearchBox from "../search-box/SearchBox";
import useComponentVisible from "services/useComponentVisible";

import "./style.scss";

export const FilterBySport: React.FC = () => {
  const [searchParam, setSearchParams] = useState<string>("");
  const [appliedQuery, setAppliedQuery] = useState<string>("");
  const { refer, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true);
  const [filteredSearch, setFilteredSearch] = useState<KindsOfSports[] | []>(
    []
  );

  const applyQuery = useCallback(debounce(setAppliedQuery, 500), []);
  const setVisibility = () => setIsComponentVisible(true);

  useEffect(() => {
    sports(searchParam, setFilteredSearch);
  }, [appliedQuery]);

  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();
  let price: URLSearchParamsInit = {
    priceFrom: query.get("priceFrom") || "",
    priceTo: query.get("priceTo") || "",
  };

  if (!price.priceTo) {
    price = {};
  }

  const sport = searchParam
    ? `${query.get("priceFrom") ? "&" : ""}sport=${searchParam}`
    : "";

  const clearParams = () => {
    navigate({
      pathname: "/trainers/filter",
      search: `?${createSearchParams(price)}`,
    });

    setAppliedQuery("");
    setSearchParams("");
    setFilteredSearch([]);
  };

  return (
    <div className="by-sport by-sport__search">
      <span className="by-sport__text">Пошук</span>
      <div className="by-sport__container">
        <input
          value={searchParam}
          onClick={setVisibility}
          onChange={(e) => {
            setSearchParams(e.target.value);
            applyQuery(e.target.value);
          }}
          type="text"
          className="by-sport__input"
          placeholder="Вид спорту, або клуб"
        />

        {(searchParam && isComponentVisible && (
          <img
            onClick={clearParams}
            className="img cross"
            src={cross}
            alt="Cross"
          />
        )) || <img className="img" src={arrow} alt="Arrow" />}
      </div>
      {appliedQuery.length > 2 && filteredSearch.length > 0 && (
        <SearchBox
          sports={filteredSearch}
          searchText={appliedQuery}
          setSearchParams={setSearchParams}
          setAppliedQuery={setAppliedQuery}
          setFilteredSearch={setFilteredSearch}
          isComponentVisible={isComponentVisible}
          refer={refer}
        />
      )}
      <button
        type="button"
        onClick={() => {
          navigate({
            pathname: "/trainers/filter",
            search: `?${createSearchParams(price)}${sport}`,
          });
        }}
        className="by-sport__button"
      >
        Знайти
      </button>
    </div>
  );
};
