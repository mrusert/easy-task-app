import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchTerm, setSearchTerm } from '../Features/lists/listSearchSlice';

const Nav = () => {
  const dispatch = useDispatch()
  const searchTerm = useSelector(selectSearchTerm)
  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value))
  } 
  return (
    <nav className="Nav">
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search">Search Lists</label>
          <input 
            id="search"
            type="text"
            placeholder="Search Lists"
            value={searchTerm} 
            onChange={handleSearch}
          />
        </form>
        <ul>
          <li><Link to="/" >Home</Link></li>
        </ul>
    </nav>
  )
  }

export default Nav