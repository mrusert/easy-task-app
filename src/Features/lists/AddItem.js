import { useParams, useNavigate } from "react-router-dom"
import {  useRef, useState } from 'react'
import { selectListById, useUpdateItemsMutation } from './listsSlice'
import { useSelector } from "react-redux";


const AddItem = ( {listId} ) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const inputRef = useRef()

    const [updateItems, {isLoading}] = useUpdateItemsMutation()
    const list = useSelector(state => selectListById(state, id))

    const [newItem, setNewItem] = useState([])
    
    const canSave = !isLoading && newItem

    const handleNewItem = (e) => {
        e.preventDefault()
        const itemId = list.items.length ? (Number(list.items[list.items.length - 1].id) + 1).toString() : "1"
        updateItems({listId: list.id, items: [...list.items, {id: itemId, checked: false, name: newItem}]})
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
                disabled={!canSave}
                // set focus back to input once button is clicked using the useRef hook, see ref={inputRef} on input
                onClick={() => inputRef.current.focus()}
                >
                    Add
            </button>
        </form>
    )
}

export default AddItem