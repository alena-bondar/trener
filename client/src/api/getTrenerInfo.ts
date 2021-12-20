import axios from "axios";
import { BASE_URL } from "services/BASE_URL";

export const getTrenerInfo = async (id: any) => {
  const result = await axios.get(BASE_URL + "/trainers/" + id);

  return result;
};
