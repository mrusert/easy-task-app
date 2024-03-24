import api from '../api/lists'
import DataContext from '../Context/DataContext'
import { useContext, useState} from 'react'
import { useNavigate, useLocation } from "react-router-dom"


const ListItems = ( {listToUpdate, itemToUpdate} ) => {
  const { lists, setLists } = useContext(DataContext)
  const [editItem, setEditItem] = useState(itemToUpdate.item)
  const [editMode, setEditMode] = useState(false) 
  const navigate = useNavigate()
  const location = useLocation()
  
  const handleItemCheck = async (id) => { 
    const updateItems = listToUpdate.items.map(item => item.id === id 
      ? { ...item, checked: !item.checked} 
      : item
      )
    const newList = {...listToUpdate, items: [...updateItems]}
    try {
      const response = await api.put(`/lists/${listToUpdate.id}`, newList)
      setLists(lists.map(list => list.id === listToUpdate.id ? { ...response.data } : list))
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }
    
  const handleItemDelete = async (id) => {
    const updateItems = listToUpdate.items.filter(item => item.id !== id)
    const newList = {...listToUpdate, items: [...updateItems]}
    try {
      const response = await api.put(`/lists/${newList.id}`, newList)
      setLists(lists.map(list => list.id === newList.id ? { ...response.data } : list))
    } catch (err) {
      console.log(`Error: ${err.message}`)
  }
  }

  const handleItemEdit = async (id) => {
    if (editItem === itemToUpdate.item) {
      setEditMode(false)
      location.pathname === `/lists/${listToUpdate.id}` ? navigate(`/lists/${listToUpdate.id}`) : navigate('/') 
      return
    }
    const updateItems = listToUpdate.items.map(item => item.id === id 
      ? { ...item, item: editItem} 
      : item
    )
    const newList = {...listToUpdate, items: [...updateItems]}
    try {
      const response = await api.put(`/lists/${listToUpdate.id}`, newList)
      setLists(lists.map(list => list.id === listToUpdate.id ? { ...response.data } : list))
      setEditItem(itemToUpdate.item)
      setEditMode(false)
      location.pathname === `/lists/${listToUpdate.id}` ? navigate(`/lists/${listToUpdate.id}`) : navigate('/')
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }
  return (
    <>
    {!editMode && <ul>
      <li className="item">
          <input 
              type="checkbox"
              onChange={() => handleItemCheck(itemToUpdate.id, itemToUpdate.checked)}
              checked={itemToUpdate.checked}
          />
          <label
              style={(itemToUpdate.checked) ? {textDecoration:'line-through'}: null}
              onDoubleClick={() => handleItemCheck(itemToUpdate.id, itemToUpdate.checked)}
          >{itemToUpdate.item}</label>
          <button
              onClick={() => setEditMode(!editMode)} 
              tabIndex="0"
              aria-label={`Edit ${itemToUpdate.id}`} 
          >Edit</button>
          <button
              onClick={() => handleItemDelete(itemToUpdate.id)} 
              tabIndex="1"
              aria-label={`Delete ${itemToUpdate.id}`} 
          >Delete</button>
        </li>
      </ul>}
      {editMode && 
        <form className="editForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="editItem">Edit Item</label>
            <input
              autoFocus
              id="editItem"
              type="text"
              placeholder="Edit Item"
              required
              value={editItem}
              onChange={(e) => setEditItem(e.target.value)}
          />
          <button
              type="submit"
              aria-label="Edit List Name"
              onClick={() => handleItemEdit(itemToUpdate.id)}
              >
                  Submit
              </button>
              <button
              type="submit"
              aria-label="Cancel Edit List Name"
              onClick={(e) => {
                e.preventDefault()
                setEditMode(false)
                setEditItem(itemToUpdate.item)
              }}
              >
                  Cancel
          </button>
        </form>
      }
      </>
  )
}

export default ListItems