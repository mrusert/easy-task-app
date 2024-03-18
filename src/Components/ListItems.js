import api from '../api/lists'
import DataContext from '../Context/DataContext'
import { useContext, useState, useRef } from 'react'


const ListItems = ( {listID, item, name} ) => {
  const { lists, setLists } = useContext(DataContext)
  
  const handleCheck = async (listID, itemID) => { 
    const listToUpdate = lists.filter(list => list.id === listID)[0]
    const updateItems = listToUpdate.items.map(item => item.id === itemID 
      ? { ...item, checked: !item.checked} 
      : item
      )
    const newList = {...listToUpdate, items: [...updateItems]}
    try {
      const response = await api.put(`/lists/${listID}`, newList)
      setLists(lists.map(list => list.id === listID ? { ...response.data } : list))
    } catch (err) {
      console.log(err.message)
    }
  }
    
  const handleItemDelete = async (listID, itemID) => {
    const listToUpdate = lists.filter(list => list.id === listID)[0]
    const updateItems = listToUpdate.items.filter(item => item.id !== itemID)
    const newList = {...listToUpdate, items: [...updateItems]}
    console.log(newList)
  }
  return (
    <>
    <ul>
      <li className="item">
          <input 
              type="checkbox"
              onChange={() => handleCheck(listID, item.id, item.checked)}
              checked={item.checked}
          />
          <label
              style={(item.checked) ? {textDecoration:'line-through'}: null}
              onDoubleClick={() => handleCheck(listID, item.id, item.checked)}
          >{item.item}</label>
          <button
              onClick={() => handleItemDelete(listID, item.id)} 
              tabIndex="0"
              aria-label={`Delete ${item.id}`} 
          >Delete</button>
        </li>
      </ul>
      </>
  )
}

export default ListItems