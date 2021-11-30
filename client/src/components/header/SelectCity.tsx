import React, { Dispatch, SetStateAction } from "react";

type Props = {
  setSelectedCity: Dispatch<SetStateAction<string>>;
};

export const SelectCity: React.FC<Props> = ({ setSelectedCity }) => {
  return <div></div>;
};
