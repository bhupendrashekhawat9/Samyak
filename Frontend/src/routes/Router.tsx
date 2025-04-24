
import { Route, Routes } from 'react-router-dom'
import {Dashboard} from '@screens/Dashboard'
import { Notes } from '@screens/Notes'
import { Planning } from '@screens/Planning'
import CreateTask from '@screens/Task/components/CreateTask'
import TaskDragActionProvider from '@contextProviders/TaskDragAction'
import Providers from '../Providers'
import { Menu } from '@components/Menu'
import { useEffect, useLayoutEffect } from 'react'

const Router = () => {
  let fetchElement = (scenario,color)=>{
    let ele: HTMLElement[] = document.querySelectorAll(".MENU_ELEMENT")
    // ele?.forEach((e)=>{
    //   e.style.backgroundColor = color
    // })
    console.log( Object.values(ele),scenario)
  }
  useEffect(()=>{
    fetchElement("UseEffect","red")
  },[])
  useLayoutEffect(()=>{
    fetchElement("UseLayoutEffect","green")
  },[])
  return (
    <div data-menuCategory="DEFAULT" className='MENU_ELEMENT'>
      <Menu/>

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