import { createContext, useContext, useEffect } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

// eslint-disable-next-line react/prop-types
function AppProvider({ children }) {
  
    useEffect(() => {
      
    }, []);
  
    return (
      <AppContext.Provider
        value={{
        //   username,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
  
  export { AppContext, AppProvider };