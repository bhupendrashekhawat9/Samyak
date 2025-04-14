
import { NotesEditor } from '@components/Editorjs';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'MEDIUM',
    status: 'OPEN',
    parentRefId: '',
    notes: [],
    attachments: []
  });

  const [notes, setNotes] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const onNotesChange = (data)=>{
    setNotes(data)
  }
  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value
    });
  };
let navigate = useNavigate()
  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(-1)
    console.log('Submitting task:', {...taskData,notes:notes});
    // Add API call or state management here
    
    // For demo purposes, show alert
    alert('Task created successfully!');
  };


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className=" mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-xl shadow-sm p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Create New Task</h1>
          <p className="text-gray-500 mt-1">Fill in the details below to create a new task</p>
        </div>
        
        {/* Main Form */}
        <form onSubmit={handleSubmit} className=" rounded-b-xl shadow-sm p-6">
          <div className='flex flex-row  gap-4' >
            <div className="w-1/2 flex gap-8 flex-col">
            {/* Task Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Task Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={taskData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter task title"
              />
            </div>
            
            {/* Task Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
         
                value={taskData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter task description"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Due Date */}
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  required
                  value={taskData.dueDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Priority */}
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={taskData.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={taskData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="OPEN">Open</option>
                  <option value="IN PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
              
              {/* Parent Reference ID */}
              <div>
                <label htmlFor="parentRefId" className="block text-sm font-medium text-gray-700 mb-1">
                  Parent Task ID
                </label>
                <input
                  type="text"
                  id="parentRefId"
                  name="parentRefId"
                  value={taskData.parentRefId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Optional parent task reference"
                />
              </div>
            </div>
            </div>    

          <div className='w-1/2'>

            {/* Notes Section */}
            <div className="">
              <h3 className="text-sm font-bold text-gray-800 mb-1">Notes</h3>
             <NotesEditor data={notes} onChange={onNotesChange} onSave={onNotesChange}/>
            </div>
            
         
          </div>
            
            {/* Form Actions */}
          </div>
            <div className="flex justify-end space-x-3 border-t mt-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Task
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;