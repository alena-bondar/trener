import React, { useCallback, useEffect, useState } from "react";
import SearchBox from "./search-box/SearchBox";
import { debounce } from "../../../services/debounce";
import { fetchFilteredSports } from "../../../api/fetchFilteredSports";
import { fetchTreners } from "../../../api/fetchTreners";

import "./style.scss";
import KindsOfSports from "../../../types/kindsOfSports";

export const Filters: React.FC = () => {
  const [searchParam, setSearchParams] = useState<string>("");
  const [appliedQuery, setAppliedQuery] = useState<string>("");
  const [filteredSearch, setFilteredSearch] = useState<KindsOfSports[] | []>(
    []
  );

  const applyQuery = useCallback(debounce(setAppliedQuery, 500), []);

  useEffect(() => {
    fetchFilteredSports(searchParam, setFilteredSearch);
  }, [appliedQuery]);

  return (
    <div className="filters">
      <div className="filters__search">
        <span className="filters__text">Пошук</span>
        <div className="filters__container">
          <input
            value={searchParam}
            onChange={(e) => {
              setSearchParams(e.target.value);
              applyQuery(e.target.value);
            }}
            type="text"
            className="filters__input"
            placeholder="Вид спорту, або клуб"
          />

          {(searchParam && (
            <img
              onClick={() => {
                setAppliedQuery("");
                setSearchParams("");
              }}
              className="arrow-img cross"
              src="/images/cross.svg"
              alt="Cross"
            />
          )) || (
            <img
              className="arrow-img"
              src="/images/arrow-to-right.svg"
              alt="Arrow"
            />
          )}
        </div>

        {appliedQuery.length > 2 && filteredSearch.length > 0 && (
          <SearchBox
            sports={filteredSearch}
            searchText={appliedQuery}
            setSearchParams={setSearchParams}
            setAppliedQuery={setAppliedQuery}
          />
        )}

        <button
          onClick={() => fetchTreners(searchParam)}
          className="filters__button"
        >
          Знайти
        </button>
      </div>
    </div>
  );
};
