import { useState,useCallback,useEffect } from "react";

let logoutTimer;

export const useAuth=()=>{
    const [token,setToken]=useState(false)
    const [tokenExpirationDate,setTokenExpirationDate]=useState()
    const [userId, setUserId] = useState(false);
    
    const login = useCallback((uid,token,expirationDate) => {
        setToken(token)
        setUserId(uid);
    
        // 토큰 만료시간 지정
        const tokenExpirationDate=expirationDate || new Date(new Date().getTime()+1000*60*60)
    
        setTokenExpirationDate(tokenExpirationDate)
        localStorage.setItem('userData',JSON.stringify({
          userId:uid,
          token:token,
          expiration:tokenExpirationDate.toISOString()
        }))
      }, []);
    
      const logout = useCallback(() => {
        setToken(null) 
        setUserId(null);
        setTokenExpirationDate(null)
        localStorage.removeItem('userData')
      }, []);
    
      // 자동 로그아웃
      useEffect(()=>{
        if(token && tokenExpirationDate){
          const remainingTime=tokenExpirationDate-new Date().getTime()
          logoutTimer=setTimeout(logout,remainingTime)
        } else{
          clearTimeout(logoutTimer);
        }
    
      },[token,logout,tokenExpirationDate])
    
      // 자동로그인
      useEffect(()=>{
        const storedData=JSON.parse(localStorage.getItem('userData'))
        if(storedData && storedData.token && new Date(storedData.expiration) > new Date() ){
          login(storedData.userId,storedData.token,new Date(storedData.expiration))
        }
      },[login])
      
      return {token,login,logout,userId}
}