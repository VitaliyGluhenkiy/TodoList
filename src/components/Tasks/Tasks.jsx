import React, {useState} from 'react'

import './Tasks.scss'
import penSvg from './../../assets/img/edit.svg'
import removeIcon from '../../assets/img/remove.svg'
import axios from 'axios';
import AddNewTask from "./AddNewTask";




const Tasks = ({lists , removeTaskItem , onAddTask , onEditTitle }) => {

    // debugger

    const [inputValue, setInputValue] = useState('')


    const handleClick = () => {
        axios.post('http://localhost:3001/tasks/' , { listId: 2,  text: inputValue , completed: false})
            .then(({data}) => {
                const tasksObj = {...data }
                onAddTask(tasksObj)
            })
    }

    const editNameTitle = () => {
        const newTitle = window.prompt('Введите новое название задачи' , lists.name)
        if(newTitle) {
            onEditTitle(lists.id , newTitle)
            axios
                .patch
                    ('http://localhost:3001/lists/' + lists.id , {name: newTitle})
                .catch( () => {
                    alert('Запрос не удался')
                })
        }
    }
    return (
            <div className='tasks'>
                <h1 className='tasks__title'>
                    {lists.name }
                    <img onClick={editNameTitle} className="penSvg" src={penSvg} alt="EDIT"/>

                </h1>
                <div>
                    <input
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        type="text"
                        placeholder=""
                    />
                    <button onClick={handleClick}>Добавить задачу</button>
                </div>
                <div>{!lists.tasks.length && <h2>Задачи отсутствуют</h2> }</div>
                    {
                        lists.tasks.map(task => (
                            <div key={task.id} className="tasks__items">
                                <div className="checkbox">
                                    <input id={`task-${task.id}`} type="checkbox"/>
                                    <label htmlFor={`task-${task.id}`}>
                                        <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </label>
                                    <p>{task.text}</p>
                                    <div className="removeIcon">
                                        <img onClick={() => removeTaskItem(task.id)} src={removeIcon} alt="Remove icon"/>
                                    </div>
                                </div>
                            </div>

                        ))

                    }
                    <AddNewTask lists={lists} onAddTask={onAddTask}/>


            </div>

    )
}

export default Tasks