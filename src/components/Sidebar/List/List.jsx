import React from 'react'
import classNames from 'classnames'

import './List.scss'
import { useDispatch } from 'react-redux'
import * as axios from 'axios'
import Badge from '../../Badge/Badge'
import removeIcon from '../../../assets/img/remove.svg'
import { deleteListItem } from '../../../redux/actions/listActions'

const List = ({ activeItem, onClickItem, lists }) => {
    const dispatch = useDispatch()

    function delay(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, ms)
        })
    }

    async function removeListItem(id) {
        await delay(3000)
        await axios.delete(`http://localhost:3001/lists/${id}`).then(() => {
            const newList = lists.filter(list => list.id !== id)
            dispatch(deleteListItem(newList))
        })
    }

    return (
        <ul className="list">
            {lists.map(list => (
                <div key={list.id}>
                    <li
                        className={classNames(list.className, {
                            active: list.active
                                ? list.active
                                : activeItem && activeItem.id === list.id
                        })}
                        onClick={onClickItem ? () => onClickItem(list) : null}
                    >
                        <i>
                            {list.icon ? (
                                list.icon
                            ) : (
                                <Badge color={list.color.name} />
                            )}
                        </i>
                        <span>
                            {list.name}
                            {list.tasks && `(${list.tasks.length})`}
                        </span>
                        <img
                            onClick={() => removeListItem(list.id)}
                            src={removeIcon}
                            alt="Remove icon"
                        />
                    </li>
                </div>
            ))}
        </ul>
    )
}

export default List
