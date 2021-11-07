import React, { useState } from 'react'

const DragTEST = () => {
    const [taskList, setTaskList] = useState([
        { id: 2, text: 'Изучить паттерны проектирования', order: 1 },
        { id: 3, text: 'ReactJS Hooks ', order: 2 },
        { id: 4, text: 'Redux (redux-observable, redux-saga)', order: 3 },
        { id: 5, text: 'test text', order: 4 },
        { id: 19, text: '123sdf', order: 5 },
        { id: 20, text: '458745', order: 6 }
    ])

    const [currentTask, setCurrentTask] = useState(null)

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
        // console.log(taskList)
        setTaskList(
            taskList.map(t => {
                if (t.id === task.id) {
                    return { ...t, order: currentTask.order }
                }
                if (t.id === currentTask.id) {
                    return { ...t, order: task.order }
                }
                return t
            })
        )
        e.target.style.border = 'none'
    }
    // console.log(taskList)
    const sortTasks = (a, b) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    return (
        <div>
            {taskList.sort(sortTasks).map(task => (
                <div
                    style={{ margin: 15 }}
                    onDragStart={e => dragStartHandler(e, task)}
                    onDragLeave={e => dragEndHandler(e)}
                    onDragEnd={e => dragEndHandler(e)}
                    onDragOver={e => dragOverHandler(e)}
                    onDrop={e => dropHandler(e, task)}
                    draggable={true}
                    key={task.id}
                >
                    {task.text}
                </div>
            ))}
        </div>
    )
}

export default DragTEST
