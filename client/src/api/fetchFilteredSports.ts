import axios from "axios";
// import { Dispatch, SetStateAction } from "react";
import { BASE_URL } from "../services/BASE_URL";

// import KindsOfSports from "../types/kindsOfSports";

export async function fetchFilteredSports(
  searchParam: string,
  setData: any // Dispatch<SetStateAction<{ data: KindsOfSports[] }>>
): Promise<void> {
  if (searchParam === "") {
    return;
  }

  if (searchParam.length <= 2) {
    return;
  }

  const searchUrl = `${BASE_URL}/kinds-of-sports/filter?search=${searchParam}`;
  const searchRequest = await axios.get(searchUrl);

  console.log(searchRequest);

  setData(searchRequest.data);
}
