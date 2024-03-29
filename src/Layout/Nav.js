import { Link } from 'react-router-dom'

const Nav = ( { search, setSearch } ) => {
    return (
      <nav className="Nav">
          <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search">Search Lists</label>
            <input 
              id="search"
              type="text"
              placeholder="Search Lists"
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <ul>
            <li><Link to="/" >Home</Link></li>
          </ul>
      </nav>
    )
  }

export default Nav