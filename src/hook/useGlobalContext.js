import { useContext } from "react";
import { GlobalContext } from "../hoc/GlobalContextProvider";

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  return context;
};
