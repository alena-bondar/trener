import React, { Dispatch, SetStateAction } from "react";

type Props = {
  setSelectedLanguage: Dispatch<SetStateAction<string>>;
};

export const SelectLanguage: React.FC<Props> = ({ setSelectedLanguage }) => {
  return <div></div>;
};
