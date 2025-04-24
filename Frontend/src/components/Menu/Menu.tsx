import Overlay from '@components/Overlay'
import React, { Ref, RefObject, useEffect, useRef, useState } from 'react'

import { AnimatePresence, motion } from "motion/react"
import useMenu from './useMenu'
interface MenuCardProps {
    ref: RefObject<HTMLDivElement>,
    actions:{title:string, callback:()=>void}[],
    handleClose:()=>void,
    coordinates:{
        x:number,
        y:number
    }
}

let MenuCard = ({actions,handleClose,coordinates,open}: MenuCardProps)=>{
    let handleOnClick = (e,action)=>{
        handleClose()
        action.callback()
    }
return<>
 <AnimatePresence initial={false}>

{open && <motion.div initial={true} exit={{ opacity: 0 }} className={`fixed min-w-50 z-102 bg-white/90 rounded-sm p-1 text-black`} style={{
    top:coordinates.y,
    left:coordinates.x
}}>
{
    actions.map((action,index)=>{
        return <motion.div  className='h-max w-full p-1.5 text-sm hover:bg-amber-100 cursor-pointer' onClick={(e)=>handleOnClick(e,action)}>
            {action.title}
        </motion.div>
    })
}
</motion.div>}
</AnimatePresence>

</>

}
const Menu = () => {
    let {menuOptions,methods,coordinates} = useMenu()
    let actions = menuOptions
    let open:boolean = menuOptions.length>0
    let handleClose = ()=>{
      methods.updateCurrentElement(null)
    }
    console.log(menuOptions)
  

  return (
    <>
   {!open &&  <></>}
  {open &&  <div id={"menu"} className='w-screen h-screen fixed inset-0 z-100'>
        <Overlay onClick={handleClose}/>
        <MenuCard open={open} coordinates={coordinates}  actions={actions} handleClose={handleClose} />
    </div>}
    </>
  )
}

export default Menu