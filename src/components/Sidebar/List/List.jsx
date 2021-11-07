import React from 'react'
import classNames from 'classnames'

import './List.scss'
import { useDispatch, useSelector } from 'react-redux'
import * as axios from 'axios'
import Badge from '../../Badge/Badge'
import removeIcon from '../../../assets/img/remove.svg'
import { deleteListItem } from '../../../redux/actions/listActions'
import { Link } from 'react-router-dom'

const List = ({ activeItem, onClickItem }) => {
    const { lists } = useSelector(({ listReducer }) => ({
        lists: listReducer.lists
    }))

    const dispatch = useDispatch()

    const removeListItem = id => {
        axios.delete(`http://localhost:3001/lists/${id}`).then(({ data }) => {
            const newList = lists.filter(list => list.id !== id)
            dispatch(deleteListItem(newList))
        })
    }

    return (
        <ul className="list">
            {lists.map((item, id) => (
                <Link key={id} to={'/lists/' + item.id}>
                    <li
                        className={classNames(item.className, {
                            active: activeItem && activeItem.id === item.id
                        })}
                        onClick={onClickItem ? () => onClickItem(item) : null}
                    >
                        <i>{item.color && <Badge color={item.color.name} />}</i>
                        <span>
                            {item.name}
                            {item.tasks && `(${item.tasks.length})`}
                        </span>
                        <img
                            onClick={() => removeListItem(item.id)}
                            src={removeIcon}
                            alt="Remove icon"
                        />
                        {/*<div>{item.active ? 'true' : 'false'}</div>*/}
                    </li>
                </Link>
            ))}
        </ul>
    )
}

export default List
