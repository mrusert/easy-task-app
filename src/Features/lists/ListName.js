import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState } from "react";
import { selectListById, useDeleteListMutation, useUpdateListMutation } from './listsSlice'
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from './listSearchSlice'

const ListName = ( { listId } ) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const list = useSelector(state => selectListById(state, listId))
    const [updateList, {isLoading}] = useUpdateListMutation()
    const [deleteList] = useDeleteListMutation()

    const [editListName, setEditListName] = useState(list.name)
    const [editMode, setEditMode] = useState(false) 
    
    const canSave = editListName && !isLoading && (editListName !== list.name) 
    
    const handleClearSearch = () => {
        dispatch(setSearchTerm(""))
    }
    const handleListDelete = async (id) => {
        try {
          await deleteList({id: list.id}).unwrap()
          location.pathname === `/lists/${list.id}` ? navigate(`/lists/${list.id}`) : navigate('/') 
        } catch (err) {
          console.log(`Error: ${err.message}`)
        }
    }
    
    const handleEditListName = async (id) => {
        if (canSave) {
            try {
                await updateList({id: list.id, name: editListName, complete: list.complete, items: list.items}).unwrap()
                setEditListName(list.name)
                setEditMode(false)
                location.pathname === `/lists/${list.id}` ? navigate(`/lists/${list.id}`) : navigate('/')
            } catch (err) {
                console.log(`Error: ${err.message}`)
            }
        }
    }

    return (
        <>
        {!editMode && location.pathname === '/' &&
            <ul>
            <li className="list">
            <Link to={`lists/${list.id}`} onClick={handleClearSearch}>
            <h2>{list.name}</h2>
            </Link>
            <button
                onClick={() => setEditMode(!editMode)} 
                tabIndex="0"
                aria-label={`Edit ${list.id}`} 
            >Edit</button>
            <button
                onClick={() => handleListDelete(list.id)} 
                tabIndex="1"
                aria-label={`Delete ${list.id}`} 
            >Delete</button>
            </li>
            </ul>
        }
        {!editMode && location.pathname === `/lists/${list.id}` &&
            <ul>
            <li className="list">
            <h2>{list.name}</h2>
            <button
                onClick={() => setEditMode(!editMode)} 
                tabIndex="0"
                aria-label={`Edit ${list.id}`} 
            >Edit</button>
            <button
                onClick={() => handleListDelete(list.id)} 
                tabIndex="1"
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
                disabled={!canSave}
                onClick={() => handleEditListName()}
                >
                    Submit
                </button>
                <button
                type="submit"
                aria-label="Cancel Edit List Name"
                onClick={(e) => {
                    e.preventDefault()
                    setEditMode(false)
                    setEditListName(list.name)
                }
                }
                >
                    Cancel
                </button>
        </form>
        }
        </>
    )
}

export default ListName