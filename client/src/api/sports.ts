import axios from "axios";
import { BASE_URL } from "services/BASE_URL";
import React, { Dispatch } from "react";
import KindsOfSports from "types/kindsOfSports";
import { api } from "services/api";

export async function sports(
  searchParam?: string,
  setData?: Dispatch<React.SetStateAction<[] | KindsOfSports[]>>
): Promise<Promise<void> | Promise<Error | KindsOfSports[]>> {
  if (searchParam && setData) {
    if (searchParam.length <= 2 || searchParam === "") {
      return [];
    }

    const searchUrl = `${BASE_URL}/kinds-of-sports/filter?search=${searchParam}`;
    const searchRequest = await axios.get(searchUrl);

    setData(searchRequest.data);
  } else {
    const response = await api
      .get(`/kinds-of-sports`)
      .then((res) => (res.data ? res.data : []))
      .catch((error) => error);

    return response;
  }
}
