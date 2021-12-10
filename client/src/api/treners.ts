import axios from "axios";
import { BASE_URL } from "services/BASE_URL";

let sportParam = "";
let priceParam = "";

export const treners = async (
  querySportsParam = "",
  queryPriceParam = ""
): Promise<any> => {
  sportParam =
    querySportsParam.length === 0 ? sportParam : "sport=" + querySportsParam;

  priceParam = queryPriceParam.length === 0 ? priceParam : queryPriceParam;

  if (sportParam.length === 0 && priceParam.length === 0) {
    return await axios.get(`${BASE_URL}/trainers`);
  } else {
    return await axios.get(
      `${BASE_URL}/trainers/filter?${sportParam
        .split(" ")
        .join("-")}${priceParam}`
    );
  }
};
