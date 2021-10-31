import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as axios from 'axios'
import { setTasks } from '../../redux/actions/taskActions'
import './Tasks.scss'




const AllTasks = () => {

  const { tasks } = useSelector(({ taskReducer }) => ({
    tasks: taskReducer.tasks,
  }))

  const dispatch = useDispatch()


  useEffect(() => {
    axios
      .get('http://localhost:3001/tasks')
      .then(({ data }) => {
        dispatch(setTasks(data))
      })
  }, [])

  // console.log(tasks)

  return (
    <div className="tasks">
      {
        tasks.map((task) => (
          <div key={task.id} className="tasks__items">
            <div className="checkbox">
              <input id={`task-${task.id}`} type="checkbox" />
              <label htmlFor={`task-${task.id}`}>
                <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </label>
              <p>{task.text}</p>
            </div>
          </div>

        ))

      }
    </div>
  )
}

export default AllTasks
