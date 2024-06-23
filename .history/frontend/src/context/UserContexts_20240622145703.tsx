import { api } from "@/config/api";
import { createContext, ReactNode, useCallback, useState } from "react";


interface IFormValues {
    username : string,
    email?:string,
    password : string
}


export const UserContext = createContext({
    isAuthenticated : false,
    onLogin : async (values : IFormValues)=>{},
    onRegister : async (values : IFormValues)=>{},
    onLogout : ()=> {},
})

export const UserContextProvider = ({children} : {children : ReactNode)=> {
        const [isAuthenticated , setIsAuthenticated] = useState(false)

        const onLogout = useCallback(()=> {
            localStorage.removeItem('authToken')
            setIsAuthenticated(false)
            console.log('login');
            
        } , [])

        const onLogin =async (values : IFormValues)=> {
            try {
                const response = await api.post("/auth/login" , values)
                console.log("login response"  + response);
                localStorage.setItem("authToken" , response?.data?.auuthToken)
                setIsAuthenticated(true)
                
            } catch (error : any) {
                console.log("Login error" + error);
            }
        }
        const onRegister =async (values : IFormValues)=> {
            try {
                const response = await api.post("/auth/register" , values)
                console.log("login response"  + response);
                localStorage.setItem("authToken" , response?.data?.auuthToken)
                setIsAuthenticated(true)
                
            } catch (error : any) {
                console.log("Register error" + error);
            }
        }


        return (
            <UserContext.Provider value={{isAuthenticated , onLogin , onRegister , onLogout}} >
                {children}
            </UserContext.Provider>
        )
}