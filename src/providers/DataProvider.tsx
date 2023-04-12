import React, { createContext, useContext, useState } from "react"

export const DataContext = createContext(undefined)
export const useDataContext = () => {
  return useContext(DataContext)
}
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(100)
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  )
}
