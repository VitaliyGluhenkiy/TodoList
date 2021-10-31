import React, { useEffect, useState } from 'react'
import './App.scss'
import axios from 'axios'

import AddButtonList from './components/Sidebar/AddButtonList/AddButtonList'

import Tasks from './components/Tasks/Tasks'
import { Route } from 'react-router-dom'
import AllTasks from './components/Tasks/AllTasks'
import List from './components/Sidebar/List/List'
import ListAllTasks from './components/Sidebar/ListAllTasks/ListAllTasks'

function App() {
    const [lists, setLists] = useState(null)
    const [activeItem, setActiveItem] = useState(null)

    useEffect(() => {
        axios
            .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
            .then(({ data }) => {
                setLists(data)
            })

    }, [])



    const onEditTitle = (id, newTitle) => {
        const newNameTitle = lists.map((item) => {
            if (item.id === id) {
                item.name = newTitle
            }
            return item
        })
        setLists(newNameTitle)
    }

    return (
        <div className="todo">
            <div className="todo__sidebar">
                <ListAllTasks/>
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
                    <AllTasks/>
                </Route>
                { lists && activeItem &&
                <Tasks list={activeItem}  onEditTitle={onEditTitle} />}
            </div>
        </div>
    )
}

export default App
