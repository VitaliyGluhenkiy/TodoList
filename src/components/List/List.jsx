import React, {useEffect, useState} from 'react'
import classNames from 'classnames'

import './List.scss'
import Badge from "../Badge/Badge";
import removeIcon from './../../assets/img/remove.svg'



const List = ({items , onClick , isRemovable , removeListItem}) => {

    // debugger

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
                        className={ classNames(item.className , {active: item.active})}
                    >
                        <i>
                            {item.icon ? item.icon : <Badge color={item.color.name}/>}
                        </i>
                        <span>{item.name}</span>
                        {isRemovable && <img onClick={() => removeListItem(item.id)}  src={removeIcon} alt="Remove icon" />}
                    </li>
                )
                )
            }
        </ul>
    )
}

export default List