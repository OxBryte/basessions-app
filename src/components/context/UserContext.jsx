import { createContext, useCallback, useState } from "react";

export const UserContext = createContext({
  user: {},
  setUser: () => {},
});
export default function UserProvider({ children }) {
  const [user, setUser] = useState({
    user: {  },
    token: localStorage.getItem("token"),
  });

  const setUserFn = (value) => {
    console.log(value);
    return setUser((prev) => {
      return { ...prev, user: { ...prev.user, ...value } };
    });
  };

  const contextValue = {
    user: user,
    setUser: useCallback((data) => {
      setUserFn(data);
    }, []),
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
