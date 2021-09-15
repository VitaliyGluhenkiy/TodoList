import React from 'react'

const List = ({items}) => {
    console.log(items)
    return (
        <div className="todo__sidebar">
            {
                items.map(item =>  <ul className="todo__list">
                    <li>
                        <i>
                            {item.icon}
                        </i>
                        <span>{item.name}</span>
                    </li>
                </ul>)
            }

        </div>
    )
}

export default List