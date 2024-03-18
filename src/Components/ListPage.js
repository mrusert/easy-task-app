import { useParams, Link, useNavigate } from "react-router-dom"
import DataContext from '../Context/DataContext'
import ListItems from "./ListItems"
import { useContext, useRef, useState } from 'react'


const ListPage = () => {
    const { lists, setLists } = useContext(DataContext)
    const [newItem, setNewItem] = useState([])
    const { id } = useParams()
    const list = lists.filter(list => (list.id).toString() === id)[0]
    const navigate = useNavigate()
    const inputRef = useRef()

    const handleNewItem = async () => {
        
    }

    return (
        <main className="list">
        {list && 
            <>
            <h2>{list.name}</h2>
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
            {list.items.map((item) => (
                <ListItems
                    listID={list.id} 
                    key={item.id}
                    item={item}
                />
            ))}
            </ul>
            </>
        }
        {!list && 
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