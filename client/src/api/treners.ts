import axios from "axios";
import { BASE_URL } from "services/BASE_URL";

export const treners = async (querySportsParam: string): Promise<any> => {
  if (querySportsParam.length === 0) {
    return await axios.get(`${BASE_URL}/trainers`);
  } else {
    return await axios.get(
      `${BASE_URL}/trainers/filter?sport=${querySportsParam.toLowerCase()}`
    );
  }
};
