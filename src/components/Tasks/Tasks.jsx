import React from 'react'

import './Tasks.scss'
import penSvg from './../../assets/img/edit.svg'
import removeIcon from '../../assets/img/remove.svg'
import axios from 'axios';
import AddNewTask from "./AddNewTask";




const Tasks = ({list , removeTaskItem , onAddTask , onEditTitle , withoutEmpty }) => {

    // debugger

    // const [inputValue, setInputValue] = useState('')
    //
    //
    // const handleClick = () => {
    //     axios.post('http://localhost:3001/tasks/' , { listId: 2,  text: inputValue , completed: false})
    //         .then(({data}) => {
    //             const tasksObj = {...data }
    //             onAddTask(tasksObj)
    //         })
    // }

    const editNameTitle = () => {
        const newTitle = window.prompt('Введите новое название задачи' , list.name)
        if(newTitle) {
            onEditTitle(list.id , newTitle)
            axios
                .patch
                    ('http://localhost:3001/lists/' + list.id , {name: newTitle})
                .catch( () => {
                    alert('Запрос не удался')
                })
        }
    }
    return (
            <div className='tasks'>
                <h1 style={{color: list.color.hex}} className='tasks__title'>
                    {list.name }
                    <img onClick={editNameTitle} className="penSvg" src={penSvg} alt="EDIT"/>

                </h1>
                <div>{!withoutEmpty &&  !list.tasks.length && <h2>Задачи отсутствуют</h2> }</div>
                    {
                        list.tasks.map(task => (
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
                    <AddNewTask list={list} onAddTask={onAddTask}/>


            </div>

    )
}

export default Tasks