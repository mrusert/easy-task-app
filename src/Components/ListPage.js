import ListItems from "./ListItems"
import AddItem from "./AddItem"
import ListName from "./ListName"
import { useParams, Link } from "react-router-dom"
import DataContext from '../Context/DataContext'
import { useContext } from 'react'



const ListPage = () => {
    const { lists } = useContext(DataContext)
    const { id } = useParams()
    const listToUpdate = lists.filter(list => (list.id).toString() === id)[0]

    return (
        <main className="list">
        {listToUpdate && 
            <>
            <ListName key={listToUpdate.id} listToUpdate={listToUpdate} />
            <ul>
            <AddItem listToUpdate={listToUpdate} />
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