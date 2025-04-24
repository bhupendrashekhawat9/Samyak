import { deleteTask } from '@controllers/tasks';
import { TaskType } from '@screens/Dashboard/constants';
import { useDashboardStore } from '@screens/Dashboard/model/context';
import React, { useEffect, useMemo, useState } from 'react'

let findTask = (tasks:TaskType[],id:string)=>{
    return tasks.find(task=>task.taskId === id)
}
const useMenu = () => {
;
      const [coordinates, setCoordinates] = useState({
            x:0,
            y:0
        })
    let {state:dashboardState,methods:dashboardMethods} = useDashboardStore();
    const [currentElement, setCurrentElement] = useState<HTMLElement>(null)

    let scenario:string|null = useMemo(()=> {
        
        if(!currentElement) return null
        return currentElement.dataset.menucategory??null},
        [currentElement])
    let methods = {
        updateCurrentElement :(element: HTMLElement)=>{
            setCurrentElement(element)
        }
    }
    let config = {
        "TASK":{
            options:[
                {
                    title:"Start Working",
                    callback: (e:HTMLElement)=>{
                        
                        let task:TaskType|null = (JSON.parse(currentElement?.dataset.task) as TaskType)
                        dashboardMethods.setCurrentTask(task)
                    }
                },
                {
                    title:"Delete Task",
                    callback: (e:HTMLElement)=>{
                        
                        let task:TaskType|null = (JSON.parse(currentElement?.dataset.task) as TaskType)
                        dashboardMethods.deleteTask(task)
                        deleteTask(task.taskId as string)
                    }
                },
                {
                    title:"View Notes",
                    callback: (e:HTMLElement)=>{
                        
                        let task:TaskType|null = (JSON.parse(currentElement?.dataset.task) as TaskType)
                        dashboardMethods.openTaskNotes()
                        deleteTask(task.taskId as string)
                    }
                }
            ]
        },
        "NOTE":{
            options:[
                {
                    title:"Delete Note",
                    callback: (e:HTMLElement)=>{
                        
                        let task:TaskType|null = (JSON.parse(currentElement?.dataset.task) as TaskType)
                        dashboardMethods.deleteTask(task)
                        deleteTask(task.taskId as string)
                    }
                }
            ]
        },
        "DEFAULT":{
            options:[{
                title:"Create Task",
                callback:()=>{
                    console.log("Create Task")
                }
            }]
        }

    }
    let currentMenuOptions = config[scenario]?.["options"]??[]

    console.log(currentElement)
    useEffect(()=>{
        let func = (e:React.MouseEvent)=>{
            e.preventDefault()
            setCoordinates({
                x:e.clientX,
                y:e.clientY
            })
            setCurrentElement(()=>{
                return e.target.closest(".MENU_ELEMENT")??null
            })
        }
        window.addEventListener("contextmenu",func)
        return ()=>{
            window.removeEventListener("contextmenu",func)
        }
    },[])
    return {
        menuOptions:currentMenuOptions,
        coordinates,
        methods
        }
}

export default useMenu