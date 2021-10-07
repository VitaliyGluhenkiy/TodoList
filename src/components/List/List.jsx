import React, {useState} from 'react'
import classNames from 'classnames'

import './List.scss'
import Badge from "../Badge/Badge";
import revomeIcon from './../../assets/img/remove.svg'
const List = ({items , onClick , isRemovable , onRemove}) => {


    const removeItem = (item) => {
        if(window.confirm('Вы пжпжыфпф')){
            onRemove(item)
        }
    }

    return (
        <ul onClick={onClick} className="list">
            {
                items.map((item , index) => (
                    <li
                        key={index}
                        className={ classNames(item.className , {active: item.active})}
                    >
                        <i>
                            {item.icon ? item.icon : <Badge color={item.color}/>}
                        </i>
                        <span>{item.name}</span>
                        {isRemovable && <img onClick={() => removeItem(item)}  src={revomeIcon} alt="Remove icon" />}
                    </li>
                )
                )
            }

        </ul>
    )
}

export default List