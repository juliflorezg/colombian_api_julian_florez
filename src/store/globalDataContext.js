import { createContext } from "react";

const GlobalDataContext = createContext({
  departments: [],
  regions: [],
})

export default GlobalDataContext