import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userFullName, setUserFullName] = useState('');

  const updateUserFullName = (name) => {
    setUserFullName(name);
  };

  return (
    <UserContext.Provider value={{ userFullName, updateUserFullName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
