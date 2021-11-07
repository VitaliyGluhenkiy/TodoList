export const setTasks = tasks => ({
    type: 'SET_TASKS',
    data: tasks
})

export const removeTaskItemAC = newTask => ({
    type: 'REMOVE_TASK_ITEM_AC',
    data: newTask
})

export const addNewTaskItem = newTaskItem => ({
    type: 'ADD_NEW_TASKS_ITEM',
    newTaskItem
})
export const setTasksListDG = newTasksDG => ({
    type: 'SET_TASKS_LIST_DG',
    newTasksDG
})
