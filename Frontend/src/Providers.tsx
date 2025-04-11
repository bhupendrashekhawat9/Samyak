import TaskDragActionProvider from '@components/TaskDragAction'
import React from 'react'
import { DashboardStoreProvider } from '@screens/Dashboard/model/context'
import { ThemeProvider } from '@styles/Theme'
import LoginAuthProvider from '@contextProviders/LoginAuthProvider'

const Providers = ({children}) => {
  return (
      <LoginAuthProvider>
    <ThemeProvider>
    <TaskDragActionProvider>
    <DashboardStoreProvider>
        {children}
    </DashboardStoreProvider>
    </TaskDragActionProvider>
    </ThemeProvider>
        </LoginAuthProvider>
  )
}

export default Providers