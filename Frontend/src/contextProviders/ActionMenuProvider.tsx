import React, { createContext, useContext, useState, ReactNode, DragEventHandler, useCallback, useRef, useEffect } from "react";
import { TaskType } from "@screens/Dashboard/constants";

// Define the shape of the context
interface menuState {
    open: boolean;
    position:{
        x:number,
        y:number
    }
}
interface menuAction {
    title:string,
    actions:()=>void
}
export interface TaskDragActionContextProps {

    state: menuState;
    methods: {
        onRightClick:()=>void
        open: () => void;
        close: () => void;
        setMenuOptions:()=>void
    };
}
export type TaskDragAction = { title: string, onDrop: (task: TaskType) => boolean|void, color?: string };
interface props {

    children: ReactNode;
}
// Create context with an initial empty value
const ActionMenuContext = createContext<TaskDragActionContextProps | undefined>(undefined);

interface TaskDragActionProps {
    children: ReactNode;
}

const ActionMenuProvider: React.FC<TaskDragActionProps> = ({ children }: props) => {
    const [state, setState] = useState<menuState>({
        position:{
            x:0,
            y:0
        }
    });

    return (
        <ActionMenuContext.Provider value={{ state: state, methods: methods.current }}>
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
        </ActionMenuContext.Provider>
    );
};

// Custom hook for consuming the context
export const useTaskDragAction = (): TaskDragActionContextProps => {
    const context = useContext(ActionMenuContext);
    if (!context) {
        throw new Error("useTaskDragAction must be used within a TaskDragAction provider");
    }
    return context as TaskDragActionContextProps;
};

export default ActionMenuProvider;
