import ListItems from './ListItems'
import ListName from './ListName'
import { selectListById } from './listsSlice'
import { useSelector } from "react-redux";

const List = ( {listId} ) => {
  const list = useSelector(state => selectListById(state, listId))
  
  return (
    <>
    <ListName key={list.id} listId={list.id} />
    {list.items.length > 0 &&
    list.items.map((item) => (
        <ListItems
          key={item.id}
          listId={list.id}
          itemId={item.id}
        />
      ))
    }
    {!list.items.length > 0 && 
        <p className="statusMsg">No items to display. Open list to add new item.</p>
    }
    </>
  )
}

export default List