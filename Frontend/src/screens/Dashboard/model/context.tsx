import { createContext, useContext, useEffect, useState } from "react";

import { fetchAllTask } from "./fetch";
import { TaskType } from "../constants";


interface ContextStoreType {
    tasks:TaskType[],
    currentWorkingTask:TaskType|null
}
interface ContextProps{
    state: ContextStoreType;
    methods:{
        updateActiveTask:(task:TaskType)=>void
    }
}
let ctx = createContext({})
export let DashboardStoreProvider = ({children})=>{
    const [state, setState] = useState<ContextStoreType>({
        tasks:[],
        currentWorkingTask:null
    })

    const methods = {
        updateActiveTask:(task:TaskType)=>{
            setState(prev=> ({
                ...prev, currentWorkingTask: task
            }))
        }
    }
    useEffect(()=>{

        let tasks: TaskType[]  = fetchAllTask() as TaskType[];
        setState(prev=>({
            ...prev,
            tasks
        }))
    },[])
    return <ctx.Provider value={{state,methods}}>
        {children}
    </ctx.Provider>
}
export let useDashboardStore = ()=>{
    return useContext<ContextProps>(ctx);
}