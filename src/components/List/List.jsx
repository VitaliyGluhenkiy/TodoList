import React, {useEffect, useState} from 'react'
import classNames from 'classnames'

import './List.scss'
import Badge from "../Badge/Badge";
import removeIcon from './../../assets/img/remove.svg'
import axios from "axios";



const List = ({items , onClick , isRemovable , removeListItem , onClickItem , activeItem }) => {


    const [mapingItems, setMapingItems] = useState(false)

    useEffect(() => {
        if(Array.isArray(items)){
            setMapingItems(items)
        }
    },[items])


    return (
        <ul onClick={onClick} className="list">
            {mapingItems &&
                items.map((item , id) => (
                    <li
                        key={id}
                        className={ classNames(item.className , {active: activeItem && activeItem.id === item.id})}
                        onClick = {onClickItem ? () => onClickItem(item) : null}
                    >
                        <i>
                            {item.icon ? item.icon : <Badge color={item.color.name}/>}
                        </i>
                        <span>
                            {item.name}
                            {item.tasks && `(${item.tasks.length})`}
                        </span>
                        {isRemovable && <img onClick={() => removeListItem(item.id)}  src={removeIcon} alt="Remove icon" />}
                    </li>
                )
                )
            }
        </ul>
    )
}

export default List