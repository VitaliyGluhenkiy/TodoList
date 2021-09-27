import React from 'react'

const TaskList = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                    name="task"
                    />
                    <input type="submit" value="Добавить задачу"/>
                </form>
            </div>

        </div>
    )
}

export default TaskList