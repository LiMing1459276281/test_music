import { useEffect, useContext } from 'react';
import { redirect  } from 'next/navigation';
import AuthContext from "@/components/customUI/auth-context";
const RedirectOnSignOut = () => {
  const { auth, setAuth } = useContext(AuthContext);
  useEffect(() => {
    setAuth(null);
  }, []);
  return null;
};
export default RedirectOnSignOut;