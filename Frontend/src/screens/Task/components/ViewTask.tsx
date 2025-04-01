import { NotesEditor } from '@components/Editorjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ViewTask = ({ taskData }) => {
  let navigate = useNavigate();

  return (
    <div className=" bg-gray-50 py-8 w-full">
      <div className=" mx-auto bg-white rounded-xl shadow-md p-6 flex w-full">
        {/* Header */}
   

        {/* Task Info */}
        <div className="grid grid-cols-1 w-1/2">
          <div>
            <h2 className="text-sm font-semibold text-gray-700">Title</h2>
            <p className="text-gray-800">{taskData.title}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-700">Description</h2>
            <p className="text-gray-800">{taskData.description || 'No description provided'}</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-sm font-semibold text-gray-700">Due Date</h2>
              <p className="text-gray-800">{taskData.dueDate}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-700">Priority</h2>
              <span className={`px-3 py-1 rounded-md text-white ${taskData.priority === 'HIGH' ? 'bg-red-500' : taskData.priority === 'MEDIUM' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                {taskData.priority}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-sm font-semibold text-gray-700">Status</h2>
              <p className="text-gray-800">{taskData.status}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-700">Parent Task ID</h2>
              <p className="text-gray-800">{taskData.parentRefId || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-6 w-1/2 ">
          <h2 className="text-sm font-semibold text-gray-700">Notes</h2>
          {/* <NotesEditor data={taskData.notes} readOnly={true} /> */}
        </div>

       
      </div>
    </div>
  );
};

export default ViewTask;