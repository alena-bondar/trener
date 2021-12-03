import React, { useState, useEffect, useRef } from "react";

interface Visible {
  refer: React.RefObject<HTMLHeadingElement>;
  isComponentVisible: boolean;
  setIsComponentVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useComponentVisible(
  initialIsVisible: boolean
): Visible {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const refer = useRef<HTMLHeadingElement>(null);

  const handleClickOutside = (event: any): void => {
    if (refer.current && !refer.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { refer, isComponentVisible, setIsComponentVisible };
}
