import TaskDragActionProvider from '@components/TaskDragAction'
import React from 'react'
import { DashboardStoreProvider } from '@screens/Dashboard/model/context'

const Providers = ({children}) => {
  return (
    <TaskDragActionProvider>
    <DashboardStoreProvider>
        {children}
    </DashboardStoreProvider>
    </TaskDragActionProvider>
  )
}

export default Providers