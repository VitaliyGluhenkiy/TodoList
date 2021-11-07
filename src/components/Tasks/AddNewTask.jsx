import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { addNewTaskItem } from '../../redux/actions/taskActions'

import './Tasks.scss'

import addSvg from '../../assets/img/add.svg'

const AddNewTask = ({ list }) => {
    const [visibleInputForm, setVisibleInputForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const toggleFormVisible = () => {
        setVisibleInputForm(!visibleInputForm)
        setInputValue('')
    }

    const dispatch = useDispatch()

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        }
        setIsLoading(true)
        axios
            .post('http://localhost:3001/tasks', obj)
            .then(({ data }) => {
                dispatch(addNewTaskItem(data))
                toggleFormVisible()
            })
            .catch(() => {
                alert('Ошибка при добавлении задачи')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <div className="tasks__form">
            {!visibleInputForm ? (
                <div onClick={toggleFormVisible} className="tasks__form-new">
                    <img src={addSvg} alt="Add svg" />
                    <span>Добавить задачу</span>
                </div>
            ) : (
                <div className="tasks__form-input">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <div className="buttons">
                        <button
                            onClick={addTask}
                            disabled={isLoading}
                            className="button"
                        >
                            {isLoading ? 'Добаляеться' : 'Добавить задачу'}
                        </button>
                        <button
                            onClick={toggleFormVisible}
                            className="cancelButton"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default AddNewTask
