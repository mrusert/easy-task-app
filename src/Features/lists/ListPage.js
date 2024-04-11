import ListItems from "./ListItems"
import AddItem from "./AddItem"
import ListName from "./ListName"
import { useParams, Link } from "react-router-dom"
import { selectListById } from './listsSlice'
import { useSelector } from "react-redux";


const ListPage = () => {
   
    const { id } = useParams()
    const list = useSelector(state => selectListById(state, id))

    return (
        <main className="list">
        {list && 
            <>
            <ListName key={list.id} listId={list.id} />
            <ul>
            <AddItem listId={list.id} />
            {list.items.map((item) => (
                <ListItems
                    key={item.id}
                    listId={list.id} 
                    itemId={item.id}
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