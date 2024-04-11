import { useState} from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import { selectListById, selectItemByIdFromList, useUpdateItemsMutation } from './listsSlice'
import { useSelector } from "react-redux";

const ListItems = ( {listId, itemId} ) => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const [updateItems, {isLoading}] = useUpdateItemsMutation()
  const itemToUpdate = useSelector(state => selectItemByIdFromList(state, {listId,itemId}))
  const list = useSelector(state => selectListById(state, listId))

  const [editItemName, setEditItemName] = useState(itemToUpdate ? itemToUpdate.name : '')
  const [editMode, setEditMode] = useState(false) 
  
  const canSave = editItemName && !isLoading && (editItemName !== itemToUpdate.name)
  const handleItemCheck = (id) => { 
    const updatedItemsList = list.items.map(item => item.id === id 
      ? { ...item, checked: !item.checked} 
      : item
      )
      updateItems({listId: list.id, items: updatedItemsList})
  }
    
  const handleItemDelete = (id) => {
    const updatedItemsList = list.items.filter(item => item.id !== id)
    updateItems({listId: list.id, items: updatedItemsList})
    location.pathname === `/lists/${list.id}` ? navigate(`/lists/${list.id}`) : navigate('/')
  }

  const handleItemEdit = (id) => {
    const updatedItemsList = list.items.map(item => item.id === id 
      ? { ...item, name: editItemName} 
      : item
    )
    updateItems({listId: list.id, items: updatedItemsList})
    setEditItemName(itemToUpdate.name)
    setEditMode(false)
    location.pathname === `/lists/${list.id}` ? navigate(`/lists/${list.id}`) : navigate('/')
  }
  return (
    <>
    {!editMode && itemToUpdate && <ul>
      <li className="item">
          <input 
              type="checkbox"
              onChange={() => handleItemCheck(itemToUpdate.id, itemToUpdate.checked)}
              checked={itemToUpdate.checked}
          />
          <label
              style={(itemToUpdate.checked) ? {textDecoration:'line-through'}: null}
              onDoubleClick={() => handleItemCheck(itemToUpdate.id, itemToUpdate.checked)}
          >{itemToUpdate.name}</label>
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
            <label htmlFor="editItemName">Edit Item</label>
            <input
              autoFocus
              id="editItemName"
              type="text"
              placeholder="Edit Item"
              required
              value={editItemName}
              onChange={(e) => setEditItemName(e.target.value)}
          />
          <button
              type="submit"
              aria-label="Edit List Name"
              disabled={!canSave}
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
                setEditItemName(itemToUpdate.item)
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