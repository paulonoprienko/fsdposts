import { useEffect, useState } from "react";

export const useWindowResize = () => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = (e: Event) => {
      setHeight((e.target as Window).innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    height,
  };
};
