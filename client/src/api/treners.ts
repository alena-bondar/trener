import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "services/BASE_URL";
// import Treners from "../types/treners";

export const treners = async (
  querySportsParam = "",
  queryPriceParam = ""
): Promise<AxiosResponse<any>> => {
  if (querySportsParam.length === 0 && queryPriceParam.length === 0) {
    return await axios.get(`${BASE_URL}/trainers`);
  } else {
    return await axios.get(
      `${BASE_URL}/trainers/filter?${querySportsParam.split(" ").join("-")}${
        queryPriceParam ? "&" : ""
      }${queryPriceParam}`
    );
  }
};
