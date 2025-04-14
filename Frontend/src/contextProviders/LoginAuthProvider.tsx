

import React, { use, useContext, useEffect, useState } from 'react'
import LoginScreen from '@screens/LoginAuth/Login';
import DoAjax from '@utils/fetch';
import { jwtDecode } from 'jwt-decode';


let ctx = React.createContext<loginAuthContextType>({
    methods: {
        register: async() => {
            return null
        },
        checkIsLoggedIn: async() => {
            return false
        },
        logout: async() => {
            return null
        },
        login: async() => {
            return null
        },
        loginGoogle: async() => {
            return null
        },
        loginGitHub: async() => {
            return null
        }
    },
    state: {
        userDetails: null
    }
})
interface UserDetails {
    userName?: string;
    token?: string;
    userEmail: string;
    userId?:string,
    password?:string
}
interface loginAuthState {
    userDetails: UserDetails | null
}
interface loginAuthMethods {
    checkIsLoggedIn: () => void;
    logout: () => void;
    login: (creds:UserDetails) => Promise<UserDetails>;
    loginGoogle: () => Promise<UserDetails>|null    ;
    loginGitHub: () => Promise<UserDetails>|null;
    register: (user:UserDetails)=>Promise<UserDetails>|null
}
export interface loginAuthContextType {
    state: loginAuthState;
    methods: loginAuthMethods;
}
const LoginAuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, setState] = useState<loginAuthState>({
        userDetails: null
    })

    let methods: loginAuthMethods = {
        checkIsLoggedIn: () => {
            
            let sessionToken = localStorage.getItem("token")
            if (sessionToken && sessionToken != "undefined") {
                
                let userDetails:UserDetails = jwtDecode(sessionToken??"");
                setState(prev=>({
                    ...prev,
                    userDetails:{
                        ...userDetails,
                        userEmail:userDetails.userEmail
                    } as UserDetails
                }))
                return true
            }
            return false
        },
        logout: () => {
            setState({
                ...state,
                userDetails: null
            })
            localStorage.removeItem("token")
        },
        register: async(user)=> {
            
            try{
                let response = await DoAjax.post("/userAuth/register").payload({
                    userEmail: user.userEmail,
                    userPassword: user.password,
                    userName: user.userName
                }).exec()
                if(response.status==200){
                    localStorage.setItem("token", response.data.token)
                    setState({
                        ...state,
                        userDetails: response.data
                    })
                }
                return response
            }catch(e){
                console.log("User Registration failed"+" "+e)
            }
            return null
        },
        login: async (creds ) => {
            try {
                if (!creds) {
                    return;
                }
                let response = await DoAjax.post("/userAuth/login").payload({
                    userEmail: creds.userEmail,
                    userPassword: creds.password
                }).exec()

                if (response.status === 200) {
                    localStorage.setItem("token", response.data.token)
                    setState({
                        ...state,
                        userDetails: response.data
                    })
                    return response.data
                }else{
                    alert(response.message)
                }
                return {}
                
            } catch (error) {
                console.log("Error Logging in ❌:", error);
                return null
            }
        },
        loginGoogle: async() => {
            return null
        },
        loginGitHub: async() => {
            return null
        }
    }
    useEffect(() => {
        methods.checkIsLoggedIn()
    }, [])
    return (
        <ctx.Provider value={{ state, methods }}>
            {
                state.userDetails && children
            }
            {
                !state.userDetails && <LoginScreen />
            }
        </ctx.Provider>
    )
}

export const useLoginAuth = () => {
    return useContext(ctx)
}

export default LoginAuthProvider
