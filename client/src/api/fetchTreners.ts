import axios from "axios";
import { BASE_URL } from "../services/BASE_URL";

export const fetchTreners = async (data: string) => {
  if (data.length === 0) {
    return;
  }

  const getTreners = await axios.get(
    `${BASE_URL}/trainers/filter?sport=${data.toLowerCase()}`
  );

  console.log(getTreners.data);
};
