import { api } from "../services/api";
import KindsOfSports from "../types/kindsOfSports";

export const fetchKindsOfSports = async (): Promise<
  Error | KindsOfSports[]
> => {
  const response = await api
    .get(`/kinds-of-sports`)
    .then((res) => (res.data ? res.data : []))
    .catch((error) => error);

  return response;
};
