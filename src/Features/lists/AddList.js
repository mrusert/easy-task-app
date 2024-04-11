import { useNavigate } from 'react-router-dom'
import {  useRef, useState } from 'react'
import { useAddNewListMutation } from './listsSlice'


const AddList = () => {
    const [addnewList, {isLoading}] = useAddNewListMutation()
    const [newListName, setnewListName] = useState("")
    const navigate = useNavigate()
    const inputRef = useRef()

    const canSave = newListName && !isLoading

    const handleNewList = async (e) => {
        e.preventDefault()
        try {
            await addnewList({name: newListName})
            setnewListName('')
            navigate('/')
            
        } catch (err) {
            console.error(`Failed to save the list: ${err}`)
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
              value={newListName}
              onChange={(e) => setnewListName(e.target.value)}
          />
          <button
              type="submit"
              aria-label="Add List"
              disabled={!canSave}
              // set focus back to input once button is clicked using the useRef hook, see ref={inputRef} on input
              onClick={() => inputRef.current.focus()}
              >
                  Add
          </button>
    </form>
  )
}

export default AddList