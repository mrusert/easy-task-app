import { useContext, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/lists'
import DataContext from '../Context/DataContext'

const AddList = () => {
    const { lists, setLists } = useContext(DataContext)
    const [newList, setNewList] = useState([])
    const navigate = useNavigate()
    const inputRef = useRef()

    const handleNewList = async (e) => {
        e.preventDefault()
        const listID = lists.length ? (Number(lists[lists.length - 1].id) + 1).toString() : "1"
        const listToAdd = {id: listID, name: newList, complete: false, items: []}
        try {
            const response = await api.post('/lists', listToAdd)
            const allLists = [ ...lists, response.data ]
            setLists(allLists)
            setNewList('')
            navigate('/')
        } catch (err) {
            console.log(`Error: ${err.message}`)
        } 
    }
  return (
    <form className="addForm" onSubmit={handleNewList}>
          <label htmlFor="addList">Add List</label>
          <input
              autoFocus
              ref={inputRef}
              id="addList"
              type="text"
              placeholder="Add List"
              required
              value={newList}
              onChange={(e) => setNewList(e.target.value)}
          />
          <button
              type="submit"
              aria-label="Add List"
              // set focus back to input once button is clicked using the useRef hook, see ref={inputRef} on input
              onClick={() => inputRef.current.focus()}
              >
                  Add
          </button>
    </form>
  )
}

export default AddList