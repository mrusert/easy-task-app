import { Link, useNavigate, useLocation } from "react-router-dom"
import DataContext from '../Context/DataContext'
import { useContext, useState } from 'react'
import api from '../api/lists'

const ListName = ( { listToUpdate } ) => {
    const { lists, setLists } = useContext(DataContext)
    const [editListName, setEditListName] = useState(listToUpdate.name)
    const [editMode, setEditMode] = useState(false) 
    const navigate = useNavigate()
    const location = useLocation()

    const handleListDelete = async (id) => {
        try {
          await api.delete(`/lists/${id}`)
          const newLists = lists.filter(listToUpdate => listToUpdate.id !== id)
          setLists(newLists)
          location.pathname === `/lists/${listToUpdate.id}` ? navigate(`/lists/${listToUpdate.id}`) : navigate('/') 
        } catch (err) {
          console.log(`Error: ${err.message}`)
        }
    }
    
    const handleEditListName = async (id) => {
        if (editListName === listToUpdate.name) {
            setEditMode(false)
            location.pathname === `/lists/${listToUpdate.id}` ? navigate(`/lists/${listToUpdate.id}`) : navigate('/') 
            return
        }
        listToUpdate.name = editListName
        try {
            const response = await api.put(`/lists/${listToUpdate.id}`, listToUpdate)
            setLists(lists.map(newList => newList.id === id ? { ...response.data } : newList))
            setEditListName(listToUpdate.name)
            setEditMode(false)
            location.pathname === `/lists/${listToUpdate.id}` ? navigate(`/lists/${listToUpdate.id}`) : navigate('/')
          } catch (err) {
            console.log(`Error: ${err.message}`)
        }
    }

    return (
        <>
        {!editMode &&
            <ul>
            <li className="list">
            <Link to={`lists/${listToUpdate.id}`}>
            <h2>{listToUpdate.name}</h2>
            </Link>
            <button
                onClick={() => setEditMode(!editMode)} 
                tabIndex="0"
                aria-label={`Edit ${listToUpdate.id}`} 
            >Edit</button>
            <button
                onClick={() => handleListDelete(listToUpdate.id)} 
                tabIndex="0"
                aria-label={`Delete ${listToUpdate.id}`} 
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