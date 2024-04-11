import List from "./List"
import AddList from "./AddList"
import { useSelector } from "react-redux";
import { selectAllLists, useGetListsQuery, selectFilteredLists } from "./listsSlice"
import { selectSearchTerm } from "./listSearchSlice";

const ListHome = () => {
  
  const {
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetListsQuery()

  // const lists = useSelector(selectAllLists)
  // Retrieve the current search term from the Redux store
  const searchTerm = useSelector(selectSearchTerm);
  // Now using selectFilteredLists to filter lists based on the search term
  const lists = useSelector(state => selectFilteredLists(state, searchTerm));
  
  return (
    <main className="Home">
        <AddList />
        {isLoading && 
          <p className="statusMsg">Loading lists...</p>
        }
        {!isLoading && isError && 
          <p className="statusMsg" style={{color: "red"}}>
            {error.status ? `Error ${error.status}: ${error.error}` : 'An unknown error occurred'}
          </p>
        }
        {isSuccess &&
          (lists.length 
            ? 
            lists.map((list) => (
              <List key={list.id} listId={list.id} />
              ))
            : <p className="statusMsg">No lists to display</p>)
        }
    </main>
  )
}

export default ListHome