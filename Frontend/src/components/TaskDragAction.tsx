import React, { createContext, useContext, useState, ReactNode, DragEventHandler, useCallback, useRef } from "react";

// Define the shape of the context
interface DragState {
    open: boolean;
    active: null | "Completed" | "In Progress" | "Delete",
    draggedTask:null|Object
}

export interface TaskDragActionContextProps {
   
    state: DragState;
    methods: {
        onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
        open: () => void;
        close: () => void;
    }
}

// Create context with an initial empty value
const TaskDragContext = createContext<TaskDragActionContextProps | undefined>(undefined);

interface TaskDragActionProps {
    children: ReactNode;
}

const TaskDragActionProvider: React.FC<TaskDragActionProps> = ({ children }) => {
    const [state, setState] = useState<DragState>({
        open: false,
        active: null,
        draggedTask:null
    });
    const handleDragEnter = (section: DragState["active"]) => {
        setState(prev => ({
            ...prev,
            active: section
        }))
    }
    let handleDrop = (e: React.DragEvent<HTMLElement>) => {
        let task = (e.dataTransfer.getData("task"))
      close()
      if(task != JSON.stringify(state.draggedTask)){
          setState(prev=> ({...prev,draggedTask: JSON.parse(task) }))
        }

    }

    let sections: DragState["active"][] = ["Completed", "In Progress", "Delete"]


    let methods = useRef<TaskDragActionContextProps["methods"]>({
        onDrop: (e) => null,
        open:() => setState((prev) => ({ ...prev, open: true })),
        close : () => setState((prev) => ({ ...prev, open: false }))
    })
    return (
        <TaskDragContext.Provider value={{ state: state, methods: methods.current }}>
            <div className="relative">

                {state.open && (
                    <div className="fixed inset-0 bg-gradient-to-b from-black to-neutral-200 opacity-50 flex justify-center items-center">
                        <div className="flex flex-row gap-4">
                            {sections.map((text) => (
                                <div
                                    onDragEnter={() => handleDragEnter(text)}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleDrop}
                                    dataset-val={text}
                                    key={text}
                                    className={`p-40 rounded-2xl border-2 border-dashed border-amber-700 flex justify-center items-center ${state.active == text ? "bg-green-950" : "bg-white"}`}
                                >
                                    <p className="font-bold text-lg text-black">{text}</p>
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
