import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { TaskType } from "../constants";
import { fetchAllTasks } from "../../../controllers/tasks";


interface ContextStoreType {
    tasks:TaskType[],
    currentWorkingTask:TaskType|null,
    isNotesVisible:boolean
}
interface ContextProps{
    state: ContextStoreType;
    methods:{
        updateActiveTask:(task:TaskType)=>void,
        setTasks: (input: (arg:TaskType[])=>TaskType[]) => void,
        fetchAllTask:()=>Promise<void>,
        deleteTask:(task:TaskType)=>void,
        updateTask:(task:TaskType)=>void,
        openTaskNotes:()=>void,
        closeTaskNotes:()=>void,
        setCurrentTask:(task:TaskType|null)=>void
    }
}
let ctx = createContext({})
export let DashboardStoreProvider = ({children}: {children:ReactNode})=>{
    const [state, setState] = useState<ContextStoreType>({
        tasks:[],
        currentWorkingTask:null,
        isNotesVisible:false
    })
    const methods = {
        updateActiveTask:(task:TaskType)=>{
            setState(prev=> ({
                ...prev, currentWorkingTask: task
            }))
        },
        fetchAllTask:async ()=>{
            let tasks = await fetchAllTasks();
            let data:TaskType[]  = tasks.data??[]
            setState(prev=>({
                ...prev,
                tasks:data
            }))
        },
        setTasks:(input:(prev:TaskType[])=>TaskType[])=>{
                setState((prev)=>{
                    return {
                        ...prev,
                        tasks:input(prev.tasks)??[]
                    }
                })
        },
        deleteTask:(task:TaskType)=>{
            setState(prev=>({
                ...prev,
                tasks: prev.tasks.filter(t=>t.taskId !== task.taskId)
            }))
        },
        updateTask:(task:TaskType)=>{
            setState(prev=>({
                ...prev,
                tasks: prev.tasks.map(t=>t.taskId === task.taskId ? task : t)
            }))
        },
        openTaskNotes:()=>{
            setState(prev=>({
                ...prev,
                isNotesVisible:true
            }))
        },
        closeTaskNotes:()=>{
            setState(prev=>({
                ...prev,
                isNotesVisible:false
            }))
        },
        setCurrentTask:(task:TaskType|null)=>{
            setState(prev=>({
                ...prev,
                currentWorkingTask:task
            }))
        }
    }
    useEffect(()=>{
    methods.fetchAllTask()
    },[])
    return <ctx.Provider value={{state,methods}}>
        {children}
    </ctx.Provider>
}
export let useDashboardStore = ()=>{
    return useContext<ContextProps>(ctx);
}