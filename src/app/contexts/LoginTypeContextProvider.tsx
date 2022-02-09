import React, {createContext, useState, useEffect} from 'react';
import {localStorage } from '../services'

export const LoginTypeContext = createContext({
    loginType: '',
    setLoginType: (type: string)=>{}
})

export const LOGIN_TYPE_KEY = 'logintype';


const LoginTypeContextProvider = ({children}:any) => {
    useEffect(()=>{
        if(loginType.length===0) {
            (async()=>{
                setLoginType(await localStorage.get(LOGIN_TYPE_KEY, ""));
            })()
        }
    }, [])
    const [loginType, setLoginType] = useState('')
  return (
    <LoginTypeContext.Provider value={{loginType,setLoginType}}>
        {children}
    </LoginTypeContext.Provider>
  );
};

export default LoginTypeContextProvider;
