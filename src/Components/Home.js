import Feed from "./Feed"
import { useContext } from 'react'
import DataContext from '../Context/DataContext'

const Home = () => {
  const { searchResults, fetchError, isLoading } = useContext(DataContext)
  return (
    <main className="Home">
        {isLoading && 
          <p className="statusMsg">Loading lists...</p>
        }
        {!isLoading && fetchError && 
          <p className="statusMsg" style={{color: "red"}}>{fetchError}</p>
        }
        {!isLoading && !fetchError &&
          (searchResults.length 
            ?  <Feed lists={searchResults} />
            : <p className="statusMsg">No lists to display</p>)
        }
    </main>
  )
}

export default Home