import React, { useCallback, useEffect, useState } from "react";

import { debounce } from "services/debounce";
import { sports } from "api/sports";
import { treners } from "api/treners";
import arrow from "images/arrow-to-right.svg";
import cross from "images/cross.svg";

import KindsOfSports from "types/kindsOfSports";
import SearchBox from "./search-box/SearchBox";
import "./style.scss";
import useComponentVisible from "services/useComponentVisible";

export const Filters: React.FC = (): JSX.Element => {
  const [searchParam, setSearchParams] = useState<string>("");
  const [appliedQuery, setAppliedQuery] = useState<string>("");
  const { refer, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true);
  const [filteredSearch, setFilteredSearch] = useState<KindsOfSports[] | []>(
    []
  );

  const applyQuery = useCallback(debounce(setAppliedQuery, 500), []);
  const setVisibility = () => setIsComponentVisible(true);
  const clearParams = () => {
    setAppliedQuery("");
    setSearchParams("");
    setFilteredSearch([]);
  };

  useEffect(() => {
    sports(searchParam, setFilteredSearch);
  }, [appliedQuery]);

  return (
    <div className="filters">
      <div className="filters__search">
        <span className="filters__text">Пошук</span>
        <div className="filters__container">
          <input
            value={searchParam}
            onClick={setVisibility}
            onChange={(e) => {
              setSearchParams(e.target.value);
              applyQuery(e.target.value);
            }}
            type="text"
            className="filters__input"
            placeholder="Вид спорту, або клуб"
          />

          {(searchParam && isComponentVisible && (
            <img
              onClick={clearParams}
              className="arrow-img cross"
              src={cross}
              alt="Cross"
            />
          )) || <img className="arrow-img" src={arrow} alt="Arrow" />}
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
          onClick={() => treners(searchParam)}
          className="filters__button"
        >
          Знайти
        </button>
      </div>
    </div>
  );
};
