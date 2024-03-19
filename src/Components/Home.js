import Lists from "./Lists"
import AddList from "./AddList"
import { useContext} from 'react'
import DataContext from '../Context/DataContext'

const Home = () => {
  const { searchResults, fetchError, isLoading, lists } = useContext(DataContext)
  
  return (
    <main className="Home">
        <AddList />
        {isLoading && 
          <p className="statusMsg">Loading lists...</p>
        }
        {!isLoading && fetchError && 
          <p className="statusMsg" style={{color: "red"}}>{fetchError}</p>
        }
        {!isLoading && !fetchError &&
          (searchResults.length 
            ? 
              lists.map((list) => (
              <Lists 
                  key={list.id}
                  name={list.name}
                  items={list.items}
                  listID={list.id}
              />
              ))
            : <p className="statusMsg">No lists to display</p>)
        }
    </main>
  )
}

export default Home