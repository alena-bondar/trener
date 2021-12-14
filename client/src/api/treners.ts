import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "services/BASE_URL";

interface searchParams {
  sport: string | null;
  priceFrom: string | null;
  priceTo: string | null;
}

export const treners = async (
  searchParams: searchParams
): Promise<AxiosResponse<never[]>> => {
  return await axios.get(`${BASE_URL}/trainers/filter`, {
    params: searchParams,
  });
};
