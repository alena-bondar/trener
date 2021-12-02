import React from "react";
import "./style.scss";
import { editText } from "../../../../helpers/editText";
import KindsOfSports from "../../../../types/kindsOfSports";

type Props = {
  sports: KindsOfSports[];
  setSearchParams: any;
  setAppliedQuery: any;
  searchText: string;
};

const SearchBox: React.FC<Props> = ({
  sports,
  searchText,
  setSearchParams,
  setAppliedQuery,
}) => (
  <div className="searchResult">
    <ul>
      {sports.map((sport: { value: string; label: string }) => {
        const { label, value } = sport;
        const [firstPart, several, secondPart] = editText(label, searchText);

        return (
          <li
            onClick={() => {
              setSearchParams(label);
              setAppliedQuery("");
            }}
            className="searchResult__li"
            key={value}
          >
            <span className="searchResult__text">
              {firstPart}
              <span className="decorated-text">{several.trim()}</span>
              {secondPart}
            </span>
          </li>
        );
      })}
    </ul>
  </div>
);

export default React.memo(SearchBox);
