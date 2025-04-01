import React, { ReactNode } from 'react'
interface Props {
    onClick:()=>void,
    children:ReactNode
}
const Button = (props:Props) => {
  return (
    <div onClick={props.onClick} className='hover:cursor-pointer bg-green-300 p-2 w-max rounded-md' >
        {props.children}
    </div>
  )
}

export default Button