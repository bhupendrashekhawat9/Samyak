import React, { createContext, useContext, useState, ReactNode, DragEventHandler, useCallback, useRef, useEffect } from "react";
import { TaskType } from "screens/Dashboard/constants";

// Define the shape of the context
interface DragState {
    open: boolean;
    active: TaskDragAction | null,
    draggedTask: null | Object
}

export interface TaskDragActionContextProps {

    state: DragState;
    methods: {
        onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
        open: () => void;
        close: () => void;
        setDragActions: React.Dispatch<React.SetStateAction<TaskDragAction[]>>;
    };
}
type TaskDragAction = { title: "Completed" | "In Progress" | "Delete", onDrop: (task: TaskType) => void, color?: string };
interface props {

    children: ReactNode;
}
// Create context with an initial empty value
const TaskDragContext = createContext<TaskDragActionContextProps | undefined>(undefined);

interface TaskDragActionProps {
    children: ReactNode;
}

const TaskDragActionProvider: React.FC<TaskDragActionProps> = ({ children }: props) => {
    const [state, setState] = useState<DragState>({
        open: false,
        active: null,
        draggedTask: null
    });
    const [dragActions, setDragActions] = useState<TaskDragAction[]>([])
    const handleDragEnter = (section: DragState["active"]) => {
        setState(prev => ({
            ...prev,
            active: section
        }))
    }
    let close = () => {
        setState(prev => ({
            ...prev,
            open: false,
            active: null
        }))
    }
    let handleDrop = (e: React.DragEvent<HTMLElement>) => {
        try {
            
            let task = (e.dataTransfer.getData("task"))
            close()
            if (
                state.active?.onDrop(JSON.parse(task))
            ) {


                if (task != JSON.stringify(state.draggedTask)) {
                    setState(prev => ({ ...prev, draggedTask: JSON.parse(task) }))
                }
            }
        }
        catch (e) {
            console.log(e)
        }

    }

    let sections: TaskDragAction[] = dragActions.length > 0 ? dragActions : []

    let methods = useRef<TaskDragActionContextProps["methods"]>({
        onDrop: (e) => null,
        open: () => setState((prev) => ({ ...prev, open: true })),
        close: () => setState((prev) => ({ ...prev, open: false })),
        setDragActions: setDragActions
    })
    let handleKeydown = (e: React.KeyboardEvent) => {
        if (e.key == "Escape") {
            methods.current.close()
        }
    }

    return (
        <TaskDragContext.Provider value={{ state: state, methods: methods.current }}>
            <div className="relative">
                {state.open && (
                    <div className="fixed inset-0 z-50 bg-transparent flex justify-center items-center w-screen h-screen">
                        <div className={`grid grid-cols-2 w-screen h-screen`}>
                            {sections.map((section) => (
                                <div
                                    onDragEnter={() => handleDragEnter(section)}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleDrop}
                                    dataset-val={section.title}
                                    key={section.title}
                                    className={`bg-white/30 p-40 border-1 border-dashed  flex justify-center items-center ${state.active?.title == section.title ? section.color ?? "bg-white/90" : section.color}`}
                                >
                                    <p className={`text-black text-3xl font-extralight ${"bg-white/90"} p-4 rounded-sm`}>{section.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {children}
            </div>
        </TaskDragContext.Provider>
    );
};

// Custom hook for consuming the context
export const useTaskDragAction = (): TaskDragActionContextProps => {
    const context = useContext(TaskDragContext);
    if (!context) {
        throw new Error("useTaskDragAction must be used within a TaskDragAction provider");
    }
    return context as TaskDragActionContextProps;
};

export default TaskDragActionProvider;
