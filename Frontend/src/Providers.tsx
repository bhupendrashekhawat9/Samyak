import TaskDragActionProvider from '@contextProviders/TaskDragAction'
import React from 'react'
import { DashboardStoreProvider } from '@screens/Dashboard/model/context'
import { ThemeProvider } from '@styles/Theme'
import LoginAuthProvider from '@contextProviders/LoginAuthProvider'
import {Provider} from "react-redux"
import store from './redux/store'
const Providers = ({children}) => {
  return (
    <Provider store={store}>

      <LoginAuthProvider>
    <ThemeProvider>
    <TaskDragActionProvider>
    <DashboardStoreProvider>
        {children}
    </DashboardStoreProvider>
    </TaskDragActionProvider>
    </ThemeProvider>
        </LoginAuthProvider>
    </Provider>

  )
}

export default Providers