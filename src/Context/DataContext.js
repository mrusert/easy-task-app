import useAxiosFetch from '../Hooks/useAxiosFetch'
import { createContext, useEffect, useState } from "react";

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
    const [lists, setLists] = useState([])
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/lists')

    useEffect(() => {
        console.log(`Data:\n ${data}`)
        setLists(data)
    },[data])

    useEffect(() => {
        const filteredResults = lists.filter((list) =>
            ((list.name).toLowerCase()).includes(search.toLowerCase())
            || ((list.items.filter(items => (items.item).toLowerCase()).includes(search.toLowerCase()))));

        setSearchResults(filteredResults.reverse());
    }, [lists, search])

    return (
        // Values that will be passed to components
        <DataContext.Provider 
            value={{
                lists, setLists, fetchError, isLoading, search, setSearch, searchResults
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataContext