import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setLists } from './redux/actions/listActions'

import axios from 'axios'

import './App.scss'

import AddButtonList from './components/Sidebar/AddButtonList/AddButtonList'
import Tasks from './components/Tasks/Tasks'
import AllTasks from './components/Tasks/AllTasks'
import List from './components/Sidebar/List/List'
import ListAllTasks from './components/Sidebar/ListAllTasks/ListAllTasks'

function App() {
    const [activeItem, setActiveItem] = useState(null)

    const { lists } = useSelector(({ listReducer }) => ({
        lists: listReducer.lists
    }))
    console.log(lists)

    const dispatch = useDispatch()

    useEffect(() => {
        axios
            .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
            .then(({ data }) => {
                dispatch(setLists(data))
            })
    }, [])

    return (
        <div className="todo">
            <div className="todo__sidebar">
                <ListAllTasks />
                <Route path="">
                    <List
                        onClickItem={item => {
                            setActiveItem(item)
                        }}
                        activeItem={activeItem}
                    />
                </Route>
                <AddButtonList />
            </div>

            <div className="todo__tasks">
                <Route exact path="/all">
                    {lists &&
                        lists.map(list => (
                            <AllTasks key={list.id} listItem={list} />
                        ))}
                </Route>
                {lists && activeItem && <Tasks list={activeItem} />}
            </div>
        </div>
    )
}

export default App
