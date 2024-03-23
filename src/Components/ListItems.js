import api from '../api/lists'
import DataContext from '../Context/DataContext'
import { useContext} from 'react'


const ListItems = ( {listToUpdate, item} ) => {
  const { lists, setLists } = useContext(DataContext)
  
  const handleItemCheck = async (itemID) => { 
    const updateItems = listToUpdate.items.map(item => item.id === itemID 
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
    
  const handleItemDelete = async (itemID) => {
    const updateItems = listToUpdate.items.filter(item => item.id !== itemID)
    const newList = {...listToUpdate, items: [...updateItems]}
    try {
      const response = await api.put(`/lists/${newList.id}`, newList)
      setLists(lists.map(list => list.id === newList.id ? { ...response.data } : list))
    } catch (err) {
      console.log(`Error: ${err.message}`)
  }
  }
  return (
    <>
    <ul>
      <li className="item">
          <input 
              type="checkbox"
              onChange={() => handleItemCheck(item.id, item.checked)}
              checked={item.checked}
          />
          <label
              style={(item.checked) ? {textDecoration:'line-through'}: null}
              onDoubleClick={() => handleItemCheck(item.id, item.checked)}
          >{item.item}</label>
          <button
              onClick={() => handleItemDelete(item.id)} 
              tabIndex="0"
              aria-label={`Delete ${item.id}`} 
          >Delete</button>
        </li>
      </ul>
      </>
  )
}

export default ListItems