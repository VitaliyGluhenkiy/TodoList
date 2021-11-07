export const setLists = lists => ({
    type: 'SET_LISTS',
    data: lists
})

export const setColors = colors => ({
    type: 'SET_COLORS',
    colors
})

export const addListItem = listItem => ({
    type: 'ADD_LIST_ITEM',
    listItem
})

export const deleteListItem = newList => ({
    type: 'DELETE_LIST_ITEM',
    data: newList
})

export const setToggleItem = payload => ({
    type: 'SET_TOGGLE_ITEM',
    payload
})
export const onEditTitle = (id, newTitle) => ({
    type: 'ON_EDIT_TITLE',
    payload: id,
    newTitle
})
