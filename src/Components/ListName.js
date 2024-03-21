import { Link, useNavigate, useLocation } from "react-router-dom"
import DataContext from '../Context/DataContext'
import { useContext, useState } from 'react'
import api from '../api/lists'

const ListName = ( { list } ) => {
    const { lists, setLists } = useContext(DataContext)
    const [editListName, setEditListName] = useState(list.name)
    const [editMode, setEditMode] = useState(false) 
    const navigate = useNavigate()
    const location = useLocation()

    const handleListDelete = async (id) => {
        try {
          await api.delete(`/lists/${id}`)
          const newLists = lists.filter(list => list.id !== id)
          setLists(newLists)
          location.pathname === `/lists/${list.id}` ? navigate(`/lists/${list.id}`) : navigate('/') 
        } catch (err) {
          console.log(`Error: ${err.message}`)
        }
    }
    
    const handleEditListName = async (id) => {
        if (editListName === list.name) {
            setEditMode(false)
            location.pathname === `/lists/${list.id}` ? navigate(`/lists/${list.id}`) : navigate('/') 
            return
        }
        list.name = editListName
        try {
            const response = await api.put(`/lists/${list.id}`, list)
            setLists(lists.map(newList => newList.id === id ? { ...response.data } : newList))
            setEditListName(list.name)
            setEditMode(false)
          } catch (err) {
            console.log(`Error: ${err.message}`)
        }
    }

    return (
        <>
        {!editMode &&
            <ul>
            <li className="list">
            <Link to={`lists/${list.id}`}>
            <h2>{list.name}</h2>
            </Link>
            <button
                onClick={() => setEditMode(!editMode)} 
                tabIndex="0"
                aria-label={`Edit ${list.id}`} 
            >Edit</button>
            <button
                onClick={() => handleListDelete(list.id)} 
                tabIndex="0"
                aria-label={`Delete ${list.id}`} 
            >Delete</button>
            </li>
            </ul>
        }
        {editMode && 
            <form className="editForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="editListName">Edit List Name</label>
            <input
                autoFocus
                id="editListName"
                type="text"
                placeholder="Edit List Name"
                required
                value={editListName}
                onChange={(e) => setEditListName(e.target.value)}
            />
            <button
                type="submit"
                aria-label="Edit List Name"
                onClick={() => handleEditListName()}
                >
                    Submit
                </button>
                <button
                type="submit"
                aria-label="Cancel Edit List Name"
                onClick={() => setEditMode(false)}
                >
                    Cancel
                </button>
        </form>
        }
        </>
    )
}

export default ListName