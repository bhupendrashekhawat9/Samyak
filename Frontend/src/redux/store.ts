import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./slice/users"
let store = configureStore({
    reducer:{
        users: userReducer
    }
})

export default store