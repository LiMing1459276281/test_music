"use client"
import { createContext, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { findUserCreditsByClerkId } from "@/actions/user";

interface NavContextType {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const NavContext = createContext<NavContextType>({
  value: '',
  setValue: () => { },
});

export const NavProvider = ({ children }: { children: React.ReactNode}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    getUserCredits();
  }, []);

  async function getUserCredits() {
    const credits = await findUserCreditsByClerkId();
    setValue(String(credits));
  }

  return (
    <NavContext.Provider value={{ value, setValue }}>
      {children}
    </NavContext.Provider>
  );
};

export default NavContext;