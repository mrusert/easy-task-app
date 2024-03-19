import { useParams, useNavigate } from "react-router-dom"
import DataContext from '../Context/DataContext'
import { useContext, useRef, useState } from 'react'
import api from '../api/lists'

const AddItem = ( {listToUpdate} ) => {
    const { lists, setLists } = useContext(DataContext)
    const [newItem, setNewItem] = useState([])
    const navigate = useNavigate()
    const inputRef = useRef()
    const { id } = useParams()

    const handleNewItem = async (e) => {
        e.preventDefault()
        const itemID = listToUpdate.items.length ? (Number(listToUpdate.items[listToUpdate.items.length - 1].id) + 1).toString() : "1"
        const itemToAdd = { id: itemID, checked: false, item: newItem}
        const updateItems = [...listToUpdate.items, itemToAdd]
        const newList = {...listToUpdate, items: [...updateItems]}
        try {
            const response = await api.put(`/lists/${newList.id}`, newList)
            setLists(lists.map(list => list.id === newList.id ? { ...response.data } : list))
            } catch (err) {
            console.log(`Error: ${err.message}`)
        }
        setNewItem('')
        navigate(`/lists/${id}`)
    }
    return (
        <form className="addForm" onSubmit={handleNewItem}>
            <label htmlFor="addItem">Add Item</label>
            <input
                autoFocus
                ref={inputRef}
                id="addItem"
                type="text"
                placeholder="Add Item"
                required
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button
                type="submit"
                aria-label="Add Item"
                // set focus back to input once button is clicked using the useRef hook, see ref={inputRef} on input
                onClick={() => inputRef.current.focus()}
                >
                    Add
            </button>
        </form>
    )
}

export default AddItem