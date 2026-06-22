import { useEffect, useState, type ReactNode } from "react";
import { AuthenticationContext } from "./AuthenticationContext";
import type { AuthContextType, LoginData, User, RegisterData } from "@/types";
import {me, refresh, login, logout, register} from "@/data"

export default function AuthenticationProvider({children}:{children : ReactNode}){
    const [signedIn, setSignedIn] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [checkSession, setCheckSession] = useState(true)

    useEffect(()=>{
        
        const getUser = async () => {

            const refreshAndStore = async () => {
                const {accessToken} = await refresh()
                localStorage.setItem("accessToken", accessToken)
            }
            
            const fetchProfile = async () => {
                const data = await me()
                setUser(data.user)
                setSignedIn(true)
            }

            try {
                // if there is no access token try to refresh and store and then get the profile otherwise if there is a token just fetch the profile
                if (!localStorage.getItem("accessToken")){
                    await refreshAndStore()
                }
                await fetchProfile()
            } catch (error) {
                console.log((error));
                // if the fetching fails that might be expired token so we try to refresh and fetch one more time
                try {
                    await refreshAndStore()
                    await fetchProfile()
                } catch (refreshError) {
                    // if we didn't get the user then we remove the accessToken if any and set the user to null
                    console.log(refreshError);
                    localStorage.removeItem("accessToken")
                    setSignedIn(false)
                    setUser(null)
                }                
                
            }finally{
                setCheckSession(false)
            }
        }

        if(checkSession) getUser() //if checkSession is true, make a fetch request to get the user's profile info and update the user, signedIn and checkSession states appropriately based on the success of the request

    }, [checkSession])

    const handleSignIn = async ({email, password}:LoginData) => {
        //make the appropriate fetch request
        const {accessToken}  = await login({email, password})
        //update local storage
        localStorage.setItem("accessToken", accessToken)
        //update the appropriate state
        setCheckSession(true)
    }

    const handleRegister = async (formState: RegisterData) => {
        //make the appropriate fetch request
        const {accessToken} = await register(formState)
        //update local storage
        localStorage.setItem("accessToken", accessToken)
        //update the appropriate state
        setCheckSession(true)
    }

    const handleSignOut = async () => {
        //make the appropriate fetch request
        await logout()
        //update local storage
        localStorage.removeItem("accessToken")
        //update the appropriate state
        setUser(null)
        setSignedIn(false)
    }

    const value: AuthContextType = {
        signedIn,
        user,
        handleSignIn,
        handleSignOut,
        handleRegister,
    }

    return (
        <AuthenticationContext value={value}>
            {children}
        </AuthenticationContext>
    )
}