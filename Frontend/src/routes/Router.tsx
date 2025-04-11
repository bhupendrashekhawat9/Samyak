
import { Route, Routes } from 'react-router-dom'
import {Dashboard} from '@screens/Dashboard'
import { Notes } from '@screens/Notes'
import { Planning } from '@screens/Planning'
import CreateTask from '@screens/Task/components/CreateTask'
import TaskDragActionProvider from '@components/TaskDragAction'
import Providers from '../Providers'

const Router = () => {

  return (
    <div>
        <Routes>
   
    <Route path='/' element={
    <Dashboard/>
      }/>
            <Route path='/notes' element={<Notes/>}/>
            <Route path='/plannings' element={<Planning/>}/>
            <Route path='/createTask' element={ <CreateTask/>} />
        </Routes>
    </div>
  )
}

export default Router