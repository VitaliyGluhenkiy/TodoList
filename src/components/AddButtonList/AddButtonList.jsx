import React , {useState} from 'react'
import List from "../List/List";
import './AddButtonList.scss'
import closeSvg  from '../../../src/assets/img/close.svg'
import Badge from "./../Badge/Badge";

const AddButtonList = ({colors , onAdd}) => {

    const [visiblePopup , setVisiblePopup] = useState(false)
    const [selectedColor , selectColor] = useState(colors[0].id)
    const [inputValue, setInputValue] = useState('')

    const onClose = () => {
        setVisiblePopup(false)
        selectColor(colors[0].id)
        setInputValue('')
    }

    const addList = () => {
        if(!inputValue) {
            alert('Введите название списка')
            return
        }
        const color = colors.filter(c => c.id === selectedColor)[0].name
        onAdd({ id: Math.random(), name: inputValue, color: color})
        onClose()
    }

    return <div  className="add-list" >
        <List
            onClick={() => setVisiblePopup(true)}
            items={[
            {
                className: 'list__add-button',
                icon: <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                           className="list__icon-plus">
                    <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    />
                </svg>,
                name: 'Добавить список',
            },

        ]}/>
        {visiblePopup && <div className="add-list__popup">
            <div className="popup">
                <input
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    className="field"
                    type="text"
                    placeholder="Название списка"
                />
                <div className="closeBlock">
                    <img onClick={onClose} src={closeSvg} alt=""/>
                </div>
                <div className="colors" >
                    {
                        colors.map(item =>
                            <Badge onClick={() => selectColor(item.id)} key={item.id}  color={item.name} className={selectedColor === item.id && 'active'}/>
                            )
                    }
                </div>
                <button onClick={addList} className="button">Добавить</button>

            </div>
        </div>}
    </div>

}

export default AddButtonList