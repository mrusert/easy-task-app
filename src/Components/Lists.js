import ListItems from './ListItems'
import { Link, useNavigate } from 'react-router-dom'
import { useContext} from 'react'
import DataContext from '../Context/DataContext'
import api from '../api/lists'

const Lists = ({ listID, items, name }) => {
  const { lists, setLists } = useContext(DataContext)
  const navigate = useNavigate()

  const handleListDelete = async (id) => {
    try {
      await api.delete(`/lists/${id}`)
      const newLists = lists.filter(list => list.id !== id)
      setLists(newLists)
      navigate('/')
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  return (
    <>
    <Link to={`lists/${listID}`}>
    <ul style={{"list-style-type": "none"}}>
      <li className="list">
      <label htmlFor="">{name}</label>
      <button
        onClick={() => handleListDelete(listID)} 
        tabIndex="0"
        aria-label={`Delete ${listID}`} 
      >Delete</button>
      </li>
    </ul>
    </Link>
      {items.length > 0 && items.map((item) => (
          <ListItems
              listID={listID} 
              key={item.id}
              item={item}
          />
        ))}
        {!items.length > 0 && 
          <p className="statusMsg">No items to display. Open list to add new item.</p>
        }
    </>
  )
}

export default Lists