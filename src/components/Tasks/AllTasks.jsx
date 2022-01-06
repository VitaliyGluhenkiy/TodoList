import React, { useEffect, useState } from 'react'

import './Tasks.scss'
import { useDispatch, useSelector } from 'react-redux'
import * as axios from 'axios'
import { setTasks, setTasksListDG } from '../../redux/actions/taskActions'

const AllTasks = () => {
    const { tasks } = useSelector(({ taskReducer }) => ({
        tasks: taskReducer.tasks
    }))

    console.log(tasks)

    useEffect(() => {
        axios.get('http://localhost:3001/tasks').then(({ data }) => {
            dispatch(setTasks(data))
        })
    }, [])

    const [currentTask, setCurrentTask] = useState()

    const dispatch = useDispatch()

    function dragStartHandler(e, task) {
        setCurrentTask(task)
    }

    function dragEndHandler(e) {
        e.target.style.border = 'none'
    }

    function dragOverHandler(e) {
        e.preventDefault()
        e.target.style.border = '2px solid black'
    }

    function dropHandler(e, task) {
        e.preventDefault()
        dispatch(
            setTasksListDG(
                tasks.map(t => {
                    if (t.id === task.id) {
                        return { ...t, order: currentTask.order }
                    }
                    if (t.id === currentTask.id) {
                        return { ...t, order: task.order }
                    }
                    return t
                })
            )
        )
    }

    const sortTasks = (a, b) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    return (
        <div className="tasks">
            {tasks.sort(sortTasks).map(task => (
                <div key={task.id} className="tasks__items">
                    <div className="checkbox">
                        <input id={`task-${task.id}`} type="checkbox" />
                        <label htmlFor={`task-${task.id}`}>
                            <svg
                                width="11"
                                height="8"
                                viewBox="0 0 11 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                                    stroke="#000"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </label>
                        <p
                            onDragStart={e => dragStartHandler(e, task)}
                            onDragLeave={e => dragEndHandler(e)}
                            onDragEnd={e => dragEndHandler(e)}
                            onDragOver={e => dragOverHandler(e)}
                            onDrop={e => dropHandler(e, task)}
                            draggable={true}
                        >
                            {task.text}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AllTasks
