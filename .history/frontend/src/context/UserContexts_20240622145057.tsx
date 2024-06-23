import { api } from "@/config/api";
import { createContext, ReactNode, useState } from "react";


export const UserContext = createContext({
    isAuthenticated : false
})

export const UserContextProvider = ({children} : {children : ReactNode)=> {
        const [isAuthenticated , setIsAuthenticated] = useState(false)

        const onLogin =async (values)=> {
            try {
                const response = api.post("/auth/login" , values)
            } catch (error : any) {
                console.log("Login error" + error);
            }
        }
}