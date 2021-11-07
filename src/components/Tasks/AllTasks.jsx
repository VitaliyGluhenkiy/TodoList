import React, { useEffect, useState } from 'react'

import './Tasks.scss'
import { useDispatch } from 'react-redux'
import * as axios from 'axios'
import { setTasksListDG } from '../../redux/actions/taskActions'

const AllTasks = ({ listItem }) => {
    const [currentTask, setCurrentTask] = useState()

    const dispatch = useDispatch()

    function dragStartHandler(e, list) {
        setCurrentTask(list)
    }

    function dragEndHandler(e) {
        e.target.style.border = 'none'
    }

    function dragOverHandler(e) {
        e.preventDefault()
        e.target.style.border = '2px solid black'
    }

    function dropHandler(e, list) {
        e.preventDefault()
        dispatch(
            setTasksListDG(
                listItem.tasks.map(t => {
                    if (t.id === list.id) {
                        return { ...t, order: currentTask.order }
                    }
                    if (t.id === currentTask.id) {
                        return { ...t, order: list.order }
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
            <div className="tasks__title-block">
                <h1
                    style={{ color: listItem.color.hex }}
                    className="tasks__title"
                >
                    {listItem.name}
                </h1>
            </div>

            {listItem.tasks.sort(sortTasks).map(list => (
                <div key={list.id} className="tasks__items">
                    <div className="checkbox">
                        <input id={`task-${list.id}`} type="checkbox" />
                        <label htmlFor={`task-${list.id}`}>
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
                            onDragStart={e => dragStartHandler(e, list)}
                            onDragLeave={e => dragEndHandler(e)}
                            onDragEnd={e => dragEndHandler(e)}
                            onDragOver={e => dragOverHandler(e)}
                            onDrop={e => dropHandler(e, list)}
                            draggable={true}
                        >
                            {list.text}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AllTasks
