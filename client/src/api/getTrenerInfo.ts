import axios from "axios";
import { BASE_URL } from "services/BASE_URL";
// import Treners from "../types/treners";

export const getTrenerInfo = async (id = ""): Promise<any> => {
  const result = await axios.get(BASE_URL + "/trainers/" + id);
  // .then((res) => console.log(res));

  return result;
};
