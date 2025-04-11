

import React, { use, useContext, useEffect, useState } from 'react'
import LoginScreen from '@screens/LoginAuth/Login';
import DoAjax from '@utils/fetch';
import { jwtDecode } from 'jwt-decode';


let ctx = React.createContext<loginAuthContextType>({
    methods: {},
    state: {}
})

interface loginAuthState {
    userDetails: {
        name: string;
        id: string;
        token: string;
        emailId: string;
    } | null
}
interface loginAuthMethods {
    checkIsLoggedIn: () => void;
    logout: () => void;
    login: (email: string, password: string) => void;
    loginGoogle: () => void;
    loginGitHub: () => void;
}
export interface loginAuthContextType {
    state: loginAuthState;
    methods: loginAuthMethods;
}
const LoginAuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, setState] = useState<loginAuthState>({
        userDetails: null
    })

    let methods = {
        checkIsLoggedIn: () => {
            let sessionToken = localStorage.getItem("token")
            if (sessionToken) {
                let userDetails = jwtDecode(sessionToken);
                setState(prev=>({
                    ...prev,
                    userDetails
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
        login: async (creds: { email: string, password: string } | null | undefined) => {
            try {
                if (!creds) {
                    return;
                }
                let response = await DoAjax.post("/userAuth/login").payload({
                    userEmail: creds.email,
                    userPassword: creds.password
                }).exec()

                if (response.status === 200) {
                    localStorage.setItem("token", response.data.token)
                    setState({
                        ...state,
                        userDetails: response.data
                    })
                }
            } catch (error) {
                console.log("Error Logging in ❌:", error);
            }
        },
        loginGoogle: () => {

        },
        loginGitHub: () => {

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
