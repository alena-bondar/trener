import React from "react";
import { FilterBySport } from "./by-sport/FilterBySport";
import { FilterByPrice } from "./by-price/FilterByPrice";

export const Filters: React.FC = (): JSX.Element => {
  return (
    <div className="filters">
      <FilterBySport />
      <FilterByPrice />
    </div>
  );
};
