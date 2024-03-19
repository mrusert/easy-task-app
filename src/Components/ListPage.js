import { useParams, Link, useNavigate } from "react-router-dom"
import DataContext from '../Context/DataContext'
import ListItems from "./ListItems"
import { useContext, useRef, useState } from 'react'
import api from '../api/lists'


const ListPage = () => {
    const { lists, setLists } = useContext(DataContext)
    const [newItem, setNewItem] = useState([])
    const { id } = useParams()
    const listToUpdate = lists.filter(list => (list.id).toString() === id)[0]
    const navigate = useNavigate()
    const inputRef = useRef()

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
            console.log(err.message)
        }
        setNewItem('')
        navigate(`/lists/${id}`)
    }

    return (
        <main className="list">
        {listToUpdate && 
            <>
            <h2>{listToUpdate.name}</h2>
            <ul>
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
            {listToUpdate.items.map((item) => (
                <ListItems
                    listID={listToUpdate.id} 
                    key={item.id}
                    item={item}
                />
            ))}
            </ul>
            </>
        }
        {!listToUpdate && 
            <>
            <h2>List Not Found</h2>
            <p>Well, that's disappointing</p>
            <p>
              <Link to="/">Visit our homepage</Link>
            </p>
            </>
        }
        </main>
    )
}

export default ListPage