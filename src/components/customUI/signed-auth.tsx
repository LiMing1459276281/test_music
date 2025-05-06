"use client"
import { useEffect, useContext } from 'react';
import AuthContext from "@/components/customUI/auth-context";
import { getCurrentUser, findUserByClerkId, addUser } from "@/actions/user";
import { useUser } from '@clerk/nextjs';

const SignedOnAuth = () => {

  const { auth, setAuth } = useContext(AuthContext);
  const { user } = useUser();
  useEffect(() => {
    getUserAuth();
  }, []);

  async function getUserAuth() {
    if(user){
      // 检查用户是否存在于数据库中
      const userExists = await findUserByClerkId(user.id);
      
      // 如果用户不存在，则将用户信息保存到数据库中
      if (!userExists) {
        await addUser({
          id: user.id,
          username: user.username || '',
          email_addresses: user.emailAddresses ? [{ email_address: user.emailAddresses[0]?.emailAddress }] : [],
          first_name: user.firstName || '',
          last_name: user.lastName || '',
          gender: '',
          created_at: Math.floor(Date.now() / 1000)
        });
      }
      
      // 获取用户信息
      const authObject = await getCurrentUser();
      authObject.userId = user.id;
      if (user.emailAddresses) {
        authObject.userEmail = user.emailAddresses[0]?.emailAddress;
      }
      setAuth(authObject);
    }
  }

  return null;
};
export default SignedOnAuth;