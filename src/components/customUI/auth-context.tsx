"use client"
import { createContext, useState, Dispatch, SetStateAction, useEffect } from 'react';

type Auth = {
  userId:string;
  userEmail:string;
  creditBalance:number;
  isAdmin:boolean;
  hasMember:boolean;
}

interface AuthContextType {
  auth: Auth|null;
  setAuth: Dispatch<SetStateAction<Auth|null>>;
}

const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
  const [auth, setAuth] = useState<Auth|null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;