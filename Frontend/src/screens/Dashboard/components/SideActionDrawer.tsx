import React, { useState } from 'react'
import { useDashboardStore } from '../model/context';
import { NotesEditor } from '@components/Editorjs';
import TodaysTasks from './TodaysTasks';
import AISummary from './AISummary';
import VoiceAssistant from '@components/VoiceAssistant/VoiceAssistant';

const SideActionDrawer = () => {
    let dashboardStore = useDashboardStore();
    let todos = dashboardStore.state.tasks
    let currentWorkingTask = dashboardStore.state.currentWorkingTask

      const [notes, setNotes] = useState(null);
      const onNotesChange = (data)=>{
        setNotes(data)
      }
    let getContent = ()=>{
       
      // if(!dashboardStore.state.isNotesVisible ){
      //   return 
      // }
      if (dashboardStore.state.isNotesVisible) {
            return (
                <div className="w-full h-screen bg-black rounded-lg p-4">
               
                    <TodaysTasks/>
                
                 </div>
                
            )
        }
       
       
    }
  return (
    <div>
      <AISummary />
      {/* <VoiceAssistant/> */}
       {
        getContent()
       }
    </div>
  )
}

export default SideActionDrawer