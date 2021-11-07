import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as axios from 'axios'

import './Tasks.scss'

import { removeTaskItemAC, setTasks } from '../../redux/actions/taskActions'
import { onEditTitle } from '../../redux/actions/listActions'

import penSvg from '../../assets/img/edit.svg'
import removeIcon from '../../assets/img/remove.svg'
import AddNewTask from './AddNewTask'

const Tasks = ({ list, withoutEmpty }) => {
    const dispatch = useDispatch()

    const { tasks } = useSelector(({ taskReducer }) => ({
        tasks: taskReducer.tasks
    }))

    console.log(tasks)

    const newTasks = tasks.filter(task => task.listId === list.id)

    const editNameTitle = () => {
        const newTitle = window.prompt(
            'Введите новое название задачи',
            list.name
        )
        if (newTitle) {
            dispatch(onEditTitle(list.id, newTitle))
            axios
                .patch(`http://localhost:3001/lists/${list.id}`, {
                    name: newTitle
                })
                .catch(() => {
                    alert('Запрос не удался')
                })
        }
    }

    const removeTaskItem = id => {
        axios.delete(`http://localhost:3001/tasks/${id}`).then(({ data }) => {
            const newTask = list.tasks.filter(task => task.id !== id)
            dispatch(removeTaskItemAC(newTask))
        })
    }

    useEffect(() => {
        axios.get('http://localhost:3001/tasks').then(({ data }) => {
            dispatch(setTasks(data))
        })
    }, [])

    return (
        <div className="tasks">
            <div className="tasks__title-block">
                <h1
                    className="tasks__title"
                    style={list.color && { color: list.color.hex }}
                >
                    {list.name}
                </h1>
                <img
                    onClick={editNameTitle}
                    className="penSvg"
                    src={penSvg}
                    alt="EDIT"
                />
            </div>

            <div>
                {!withoutEmpty && !list.tasks.length && (
                    <h2>Задачи отсутствуют</h2>
                )}
            </div>
            {newTasks.map(task => (
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
                        <p>{task.text}</p>
                        <div className="removeIcon">
                            <img
                                onClick={() => removeTaskItem(task.id)}
                                src={removeIcon}
                                alt="Remove icon"
                            />
                        </div>
                    </div>
                </div>
            ))}
            <AddNewTask list={list} />
        </div>
    )
}

export default Tasks
