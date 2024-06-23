import { api } from "@/config/api";
import { createContext, ReactNode, useState } from "react";


interface IFormValues {
    username : string,
    email?:string,
    password : string
}


export const UserContext = createContext({
    isAuthenticated : false
})

export const UserContextProvider = ({children} : {children : ReactNode)=> {
        const [isAuthenticated , setIsAuthenticated] = useState(false)

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
}