import React from "react";
import { FilterBySport } from "./by-sport/FilterBySport";
import FilterByPrice from "./by-price/FilterByPrice";

export const Filters: React.FC = (): JSX.Element => {
  return (
    <div className="filters">
      <form action="/trainers/filter">
        <FilterBySport />
        <FilterByPrice />
      </form>
    </div>
  );
};
